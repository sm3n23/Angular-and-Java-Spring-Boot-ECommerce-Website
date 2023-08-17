import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  


  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
  discountPrice: Subject<number> =new BehaviorSubject<number>(0);
  

  storage: Storage = sessionStorage;

  constructor() {
    let data = this.storage.getItem('cartItems');
    if(data!=null){
      const parsedData: CartItem[] = JSON.parse(data);
      this.cartItems = parsedData;
      this.computeCartTotals();
    }
    else{

    }
   }

   persistCartItem(){
    this.storage.setItem('cartItems',JSON.stringify(this.cartItems));
   }


  addToCart(theCartItem: CartItem) {

    // check if we already have the item in our cart
    let alreadyExistingInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;


    if (this.cartItems.length > 0) {

      for (let tempCartItem of this.cartItems) {
        if (tempCartItem.id === theCartItem.id) {
          existingCartItem = tempCartItem;
          break;
        }


      }

      alreadyExistingInCart = (existingCartItem != undefined);

    }

    if (alreadyExistingInCart) {

      existingCartItem.quantity++;
      
    } else {
      this.cartItems.push(theCartItem);
    }

    this.computeCartTotals();

  }

  computeCartTotals() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    let discountPrice:number=0;

    for (let tempCartItem of this.cartItems) {
      totalPriceValue += tempCartItem.quantity * tempCartItem.unitPrice;
      totalQuantityValue += tempCartItem.quantity;

      }

    if(totalQuantityValue >=2 &&totalQuantityValue <=3){
      discountPrice = totalPriceValue - totalPriceValue/20
    }else if(totalQuantityValue >=4 && totalQuantityValue <=5){
      discountPrice = totalPriceValue - totalPriceValue/10
    }else if (totalQuantityValue >=6){
      discountPrice = totalPriceValue - totalPriceValue*(15/100)
    }

    //publish values

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    this.discountPrice.next(discountPrice);


    //debug
    this.logCartData(totalPriceValue, totalQuantityValue);

    this.persistCartItem();


  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {

    console.log("cart content");

    for (let temp of this.cartItems) {

      let subTotal = temp.quantity * temp.unitPrice;


      console.log(temp.name + "    " + temp.unitPrice + "   " + temp.quantity + "   " + subTotal);

    }

    console.log(totalPriceValue+"    "+totalQuantityValue);
    console.log("---------------          ")

  }

  decrementQuantity(cartItem: CartItem) {
      cartItem.quantity--;

      if(cartItem.quantity===0){
        this.remove(cartItem);
      }else{
        this.computeCartTotals();
      }
    
    
    }
  remove(cartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex(temp => temp.id === cartItem.id)

    if(itemIndex >-1){
      this.cartItems.splice(itemIndex,1);
      this.computeCartTotals();
      
    }
    else{
      this.computeCartTotals();
    }


  }

}


