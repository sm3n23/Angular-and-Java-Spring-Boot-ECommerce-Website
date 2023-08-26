import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {
  productCategories : ProductCategory[] = [];

  sellerMode:boolean =false;

  user: any;

  constructor(private productService: ProductService,
    private route:ActivatedRoute,
    private userService: UserService,
    ){}



  ngOnInit(): void {
    this.listProductGategories();

    this.userService.user$.subscribe(user => {
      this.user = user;

    });

    this.logOut();

  }
  
  logOut(){
    this.userService.clearUser();
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
