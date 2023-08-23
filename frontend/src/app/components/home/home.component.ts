import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productCategories : ProductCategory[] = [];

  constructor(private productService: ProductService){}



  ngOnInit(): void {
    this.listProductGategories();
  }
  listProductGategories() {
    this.productService.getProductGategories().subscribe(
      data =>{
        console.log("product categories: " + JSON.stringify(data));
        this.productCategories = data;
      }
    );
  }
}
