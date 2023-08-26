import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-seller-products',
  templateUrl: './seller-products.component.html',
  styleUrls: ['./seller-products.component.css']
})
export class SellerProductsComponent {

  products: Product[] = [];
  currentCategoryId : number = 1;
  previousCategoryId: number=1;
  searchMode: boolean = false;
  categoryMode:boolean=false;

  sellerMode:boolean= false;
  sellerId : number = 1;

  previousKeyword:string="";

  //page
  thePageNumber:number = 1;
  thePageSize:number =10;
  theTotalElements:number=0;


  user:any;

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route:ActivatedRoute,
              private userService:UserService ){ }

  ngOnInit(): void {

    this.userService.user$.subscribe(user => {
      this.user = user;
      console.log(`userId: ${user.id}`)

    });

    this.route.paramMap.subscribe(()=>{

      this.listProducts();
    })

    
  }

  listProducts(){

    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    this.categoryMode=this.route.snapshot.paramMap.has('id');
    this.sellerMode=this.route.snapshot.paramMap.has('sellerId');

    if(this.sellerMode){
      this.handleSellerProducts();
    }

    

  }
  handleSellerProducts() {
    const idParam = this.route.snapshot.paramMap.get('sellerId');
    if (idParam !== null) {
        this.sellerId = +idParam;
    } else {
        this.sellerId = 1;
    }
    
    

    console.log(`current Catergoty Id= ${this.sellerId}, the Page number =${this.thePageNumber}`)

    this.productService.getProductUserPaginate(this.thePageNumber -1,
                                                this.thePageSize,
                                                this.sellerId)
                                                .subscribe(
                                                data => {
                                                  this.products = data._embedded.products,
                                                  this.thePageNumber= data.page.number +1,
                                                  this.thePageSize=data.page.size,
                                                  this.theTotalElements=data.page.totalElements;
                                                }
                                                );
  }
  handleSearchProducts() {

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    if(this.previousKeyword != theKeyword){
      this.thePageNumber=1;

    }
    this.previousKeyword = theKeyword;

    console.log(`page = ${this.thePageNumber} , keyword = ${theKeyword}` )

    this.productService.searchProductsPaginate(this.thePageNumber -1,
                                                this.thePageSize,
                                                theKeyword).subscribe(
                                                  data => {
                                                    this.products = data._embedded.products
                                                    this.thePageNumber= data.page.number +1,
                                                    this.thePageSize=data.page.size,
                                                    this.theTotalElements=data.page.totalElements;
                                                  }
                                                  );

  }

  handleHomeProducts(){
    this.productService.getProductPaginate(this.thePageNumber -1,
                                          this.thePageSize)
                                          .subscribe(
                                            data=>{
                                              this.products = data._embedded.products,
                                              this.thePageNumber= data.page.number +1,
                                              this.thePageSize=data.page.size,
                                              this.theTotalElements=data.page.totalElements;

                                          
                                            }
                                          )
  }
  
  handleListProducts(){


    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
        this.currentCategoryId = +idParam;
    } else {
        this.currentCategoryId = 1;
    }
    
    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber=1;
    }
    this.previousCategoryId=this.currentCategoryId;

    console.log(`current Catergoty Id= ${this.currentCategoryId}, the Page number =${this.thePageNumber}`)

    this.productService.getProductListPaginate(this.thePageNumber -1,
                                                this.thePageSize,
                                                this.currentCategoryId)
                                                .subscribe(
                                                data => {
                                                  this.products = data._embedded.products,
                                                  this.thePageNumber= data.page.number +1,
                                                  this.thePageSize=data.page.size,
                                                  this.theTotalElements=data.page.totalElements;
                                                }
                                                );

  }

  updatePageSize(pageSize: string) {
    this.thePageSize=+pageSize;
    this.thePageNumber=1;
    this.listProducts();
  }


  processData(){
    return (data: any) => {
      this.products=data._embedded.products;
      this.thePageNumber=data.page.number +1;
      this.thePageSize=data.page.size;
      this.theTotalElements= data.page.totalElements;
    };
  }


  addToCart(product: Product){

    console.log("name " +product.name + "price: " + product.unitPrice);

    const theCartItem = new CartItem(product);

    this.cartService.addToCart(theCartItem);

  }



  deleteProduct(productId:number){
    if (confirm('Are you sure you want to delete this product?')){
    this.productService.deleteProduct(productId).subscribe({
      next:res=>{
        console.log(`product deleted seccussfully ${res}`)
      },
      error:err=>{
        console.log(`there was an error ${err.message}`)
      }
      }
    )}

    this.listProducts();
  }
  

}
