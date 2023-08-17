import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product!:Product;

  products:Product[]=[];


  constructor(private productServive:ProductService,
              private route:ActivatedRoute,
              private cartService: CartService){}


  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.handleProductDetails();
    }
    )  

    this.handleRecommendedProducts();
  }
  handleProductDetails(){
    const productId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productServive.getProduct(productId).subscribe(
      data=>{
        this.product=data;
      }
    )

  }

  handleRecommendedProducts(){
    this.productServive.getRecommendedProducts().subscribe(
      data=>{this.products=data._embedded.products}
    )
  }



  addToCart(){

    const cartItem = new CartItem(this.product);

    this.cartService.addToCart(cartItem);

  }

  addToCartList(product: Product){

    
    const theCartItem = new CartItem(product);

    this.cartService.addToCart(theCartItem);

  }
  

}
