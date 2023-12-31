import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {HttpClientModule} from '@angular/common/http';
import { ProductService } from './services/product.service';
import { Routes,RouterModule, Router } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';


import {
  OktaAuthModule,
  OktaCallbackComponent,
  OKTA_CONFIG,
  OktaAuthGuard
} from '@okta/okta-angular';

import {OktaAuth} from '@okta/okta-auth-js';
import myAppConfig from './config/my-app-config';
import { MembersPageComponent } from './components/members-page/members-page.component';

import { AuthModule } from '@auth0/auth0-angular';
import {OAuthModule} from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';

import { LoginButtonComponent } from './components/login-button/login-button.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { SellerComponent } from './components/seller/seller.component';
import { SellerProductsComponent } from './components/seller-products/seller-products.component';
import { UpdateProductsComponent } from './components/update-products/update-products.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginUserComponent } from './components/login-user/login-user.component';

const oktaConfig = myAppConfig.oidc;
const oktaAuth = new OktaAuth(oktaConfig);

function sendToLoginPage(oktaAuth:OktaAuth,injector:Injector){

  const router = injector.get(Router);

  router.navigate(['/login']);

}


const routes: Routes = [

  {path:'home',component:HomeComponent},

  {path:'register/seller',component:RegisterComponent},
  {path:'register/customer',component:RegisterComponent},
  {path:'seller/product/:id',component:UpdateProductsComponent},
  {path:'seller/:sellerId',component:SellerProductsComponent},
  {path:'seller/:id/create',component:SellerComponent},
  {path:'order-history',component:OrderHistoryComponent},
  {path:'members',component:MembersPageComponent, canActivate:[OktaAuthGuard],
                  data:{onAuthRequired:sendToLoginPage} },
  
  {path:'login/callback',component:OktaCallbackComponent},
  {path:'login',component:LoginUserComponent},
  
  {path:'checkout',component:CheckoutComponent},
  {path:'cart-details',component:CartDetailsComponent},
  {path:'products/:id',component:ProductDetailsComponent},
  {path:'search/:keyword',component:ProductListComponent}, 
  {path:'category/:id',component:ProductListComponent},
  {path:'seller/category/:id',component:SellerProductsComponent},
  {path:"category",component:ProductListComponent},
  {path:"products",component:ProductListComponent},
  {path:"",redirectTo:'/home',pathMatch:'full'},
  {path:"**",redirectTo:'/home',pathMatch:'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    MembersPageComponent,
    LoginButtonComponent,
    OrderHistoryComponent,
    SellerComponent,
    SellerProductsComponent,
    UpdateProductsComponent,
    HomeComponent,
    RegisterComponent,
    LoginUserComponent,
    
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule,
    AuthModule.forRoot({
      ...environment.auth,
    })
    
  ],
  providers: [ProductService, {provide:OKTA_CONFIG,useValue:{oktaAuth}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
