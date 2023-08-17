import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductDTO } from 'src/app/common/product-dto';
import { ProductService } from 'src/app/services/product.service';
import { ShopValidators } from 'src/app/validators/shop-validators';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {

  productFormGroup!:FormGroup;

  constructor(private formbuilder:FormBuilder,
              private productService:ProductService,
              private router:Router){}
  
  categories:ProductCategory[]=[];
  
  ngOnInit(): void {


    this.listProductCategories();
    
    this.productFormGroup = this.formbuilder.group({
      sku: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
      name: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
      description: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
      imageUrl: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
      unitsInStock: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      unitPrice: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
      categoryId:new FormControl('', [Validators.required]),
      active:new FormControl('', [Validators.required]),


    })
  }
  listProductCategories() {
    this.productService.getProductGategories().subscribe(
      data=>{
        this.categories=data;
      }
    )
  }

  get sku(){ return this.productFormGroup.get('sku')}
  get name(){ return this.productFormGroup.get('name')}
  get description(){ return this.productFormGroup.get('description')}
  get imageUrl(){ return this.productFormGroup.get('imageUrl')}
  get unitsInStock(){ return this.productFormGroup.get('unitsInStock')}
  get unitPrice(){ return this.productFormGroup.get('unitPrice')}
  get categoryId(){ return this.productFormGroup.get('categoryId')}
  get active(){ return this.productFormGroup.get('active')}


  onSubmit(){

    console.log("Submitting form...");

    console.log(this.productFormGroup.value)
    console.log(`productId: ${this.productFormGroup.value.categoryId.id}`)

    /* if (this.productFormGroup.invalid){
      this.productFormGroup.markAllAsTouched();
      return
    } */


    let product = new ProductDTO();

    product.sku = this.productFormGroup.value.sku;
    product.name = this.productFormGroup.value.name;
    product.description = this.productFormGroup.value.description;
    product.unitPrice = this.productFormGroup.value.unitPrice;
    product.unitsInStock =this.productFormGroup.value.unitsInStock;

    

    product.imgUrl = this.productFormGroup.value.imageUrl;

    console.log(`umageUrl: ${product.imgUrl}`)

    product.categoryId= this.productFormGroup.value.categoryId.id;

    
    console.log(product);
    
    product.active=true; 



    
    

  

    this.productService.createProduct(product).subscribe({
      next: response=>{
        alert(`Product created successfully ${response}`)
        this.router.navigateByUrl('/seller');
      },
      
      error: err=>{
        alert(`there was an error ${err.message}`);
      }
    })

  }



}
