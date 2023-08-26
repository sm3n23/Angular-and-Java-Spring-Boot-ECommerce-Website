import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { ProductCategory } from '../common/product-category';
import { ProductDTO } from '../common/product-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  

  private baseUrl = "http://localhost:8080/api/products";
  private categoryUrl = "http://localhost:8080/api/product_category";

  private createProductUrl = "http://localhost:8080/api/seller/product"
  private updateProductUrl = "http://localhost:8080/api/seller/product"

  constructor(private httpClient: HttpClient) { }



  private getProducts(Url: string): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(Url).pipe(
      map(response => response._embedded.products)
    );
  }


  getRecommendedProducts(): Observable<GetResponse> {

    return this.httpClient.get<GetResponse>(this.baseUrl);

  }

  getProductPaginate(thePage: number,
    theSize: number,): Observable<GetResponse> {

    const Url = `${this.baseUrl}?page=${thePage}&size=${theSize}`;

    return this.httpClient.get<GetResponse>(Url);
  }

  getProductListPaginate(thePage: number,
    theSize: number,
    categoryId: number): Observable<GetResponse> {

    const pageUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}&page=${thePage}&size=${theSize}`;

    return this.httpClient.get<GetResponse>(pageUrl);
  }

  getProductUserPaginate(thePage: number,
    theSize: number,
    userId: number): Observable<GetResponse> {

    const pageUrl = `${this.baseUrl}/search/findByUserId?id=${userId}&page=${thePage}&size=${theSize}`;

    return this.httpClient.get<GetResponse>(pageUrl);
  }

  searchProductsPaginate(thePage: number,
    theSize: number,
    keyword: string): Observable<GetResponse> {

    const pageUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}&page=${thePage}&size=${theSize}`;

    return this.httpClient.get<GetResponse>(pageUrl);
  }


  


  getProductGategories() {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    )
  }

  getProduct(productId: number) {
    const productUrl: string = `${this.baseUrl}/${productId}`

    return this.httpClient.get<Product>(productUrl)

  }




  searchProducts(theKeyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }



  createProduct(productDTO: ProductDTO): Observable<any> {
    console.log("Creating product...");
    return this.httpClient.post<ProductDTO>(this.createProductUrl, productDTO);
  }


  updateProduct(productId: number, productDTO: ProductDTO) {
    const updateUrl = `${this.updateProductUrl}/${productId}`
    return this.httpClient.put<ProductDTO>(updateUrl, productDTO);
  }

  deleteProduct(productId: number): Observable<any> {
    const url = `${this.updateProductUrl}/${productId}`;

    return this.httpClient.delete(url, { responseType: 'text' }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error deleting product:', error);
        return throwError('Error deleting product.');
      })
    );
  }



}

interface GetResponse {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}



