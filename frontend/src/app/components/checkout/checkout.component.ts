import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { State } from 'src/app/common/state';
import { Country } from 'src/app/common/country';
import { FormService } from 'src/app/services/form.service'
import { ShopValidators } from 'src/app/validators/shop-validators';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;


  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries:Country[]=[];

  shippingAdressStates: State[]=[];
  billingAdressStates: State[]=[];

  constructor(private formbuilder: FormBuilder,
              private formSevice: FormService,
              private cartService: CartService) { }



  ngOnInit(): void {


    this.reviewCartDetails();

    this.checkoutFormGroup = this.formbuilder.group({
      customer: this.formbuilder.group({
        firstName: new FormControl('',[Validators.required,Validators.minLength(2),ShopValidators.notOnlyWhitespace]),
        lastName: new FormControl('',[Validators.required,Validators.minLength(2),ShopValidators.notOnlyWhitespace]),
        email: new FormControl('',
                              [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])

      }),
      shippingAddress: this.formbuilder.group({
        street: new FormControl('',[Validators.required,Validators.minLength(2),ShopValidators.notOnlyWhitespace]),
        city: new FormControl('',[Validators.required,Validators.minLength(2),ShopValidators.notOnlyWhitespace]),
        state: new FormControl('',[Validators.required]),
        country: new FormControl('',[Validators.required]),
        zipCode: new FormControl('',[Validators.required,Validators.minLength(2),ShopValidators.notOnlyWhitespace]),
      }),
      billingAddress: this.formbuilder.group({
        street: new FormControl('',[Validators.required,Validators.minLength(2),ShopValidators.notOnlyWhitespace]),
        city: new FormControl('',[Validators.required,Validators.minLength(2),ShopValidators.notOnlyWhitespace]),
        state:new FormControl('',[Validators.required]),
        country: new FormControl('',[Validators.required]),
        zipCode: new FormControl('',[Validators.required,Validators.minLength(2),ShopValidators.notOnlyWhitespace]),
      }),
      creditCard: this.formbuilder.group({
        cardType: new FormControl('',[Validators.required]),
        nameOnCard: new FormControl('',[Validators.required,Validators.minLength(2),ShopValidators.notOnlyWhitespace]),
        cardNumber: new FormControl('',[Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('',[Validators.required, Validators.pattern('[0-9]{3}')]),
        expirationMonth: [''],
        expirationYear: [''],
      })

    })

    //Years
    const startMonth:number= new Date().getMonth();
    this.formSevice.getCreditCardMonths(startMonth).subscribe(
      data=>{
        this.creditCardMonths=data
      }
    )

    //Months

    this.formSevice.getCreditCardYears().subscribe(
      data=>{
        this.creditCardYears=data;
      }
    )

    this.formSevice.getCountries().subscribe(
    data=> {
      console.log("ret countries: "+JSON.stringify(data))
      this.countries = data;
    }
    );


  }
  reviewCartDetails() {
    
    this.cartService.totalPrice.subscribe(
      data=>{
        this.totalPrice=data;
      }
    );

    this.cartService.totalQuantity.subscribe(
      data=>{
        this.totalQuantity=data;
      }
    )
  }

  get firstName(){return this.checkoutFormGroup.get('customer.firstName');}
  get lastName(){return this.checkoutFormGroup.get('customer.lastName');}
  get email(){return this.checkoutFormGroup.get('customer.email');}

  get shippingAdressStreet(){return this.checkoutFormGroup.get('shippingAddress.street')};
  get shippingAdressCity(){return this.checkoutFormGroup.get('shippingAddress.city')};
  get shippingAdressState(){return this.checkoutFormGroup.get('shippingAddress.state')};
  get shippingAdressCountry(){return this.checkoutFormGroup.get('shippingAddress.country')};
  get shippingAdressZipCode(){return this.checkoutFormGroup.get('shippingAddress.zipCode')};

  get billingAdressStreet(){return this.checkoutFormGroup.get('billingAddress.street')};
  get billingAdressCity(){return this.checkoutFormGroup.get('billingAddress.city')};
  get billingAdressState(){return this.checkoutFormGroup.get('billingAddress.state')};
  get billingAdressCountry(){return this.checkoutFormGroup.get('billingAddress.country')};
  get billingAdressZipCode(){return this.checkoutFormGroup.get('billingAddress.zipCode')};



  get creditCardType(){return this.checkoutFormGroup.get('creditCard.cardType')};
  get creditCardNameOnCard(){return this.checkoutFormGroup.get('creditCard.nameOnCard')};
  get creditCardNumber(){return this.checkoutFormGroup.get('creditCard.cardNumber')};
  get creditCardCVV(){return this.checkoutFormGroup.get('creditCard.securityCode')};


  copyShippingToBilling(event: any) {

    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);

      this.billingAdressStates = this.shippingAdressStates;

    } 
    else {
      this.checkoutFormGroup.controls['billingAddress'].reset();

      this.billingAdressStates= [];
    }
  }

  onSubmit() {
    console.log("customer Details :");
    console.log(this.checkoutFormGroup.get('customer')?.value);
  }


  handleMonthsAndYears(){
    const currentYear: number = new Date().getFullYear();
    const formYear = this.checkoutFormGroup.get('creditCard');
    const selectedYear:number = Number(formYear?.value.expirationYear);

    let month:number;

    if(currentYear===selectedYear){
      month= new Date().getMonth();

    }else{
      month =1;
    }

    this.formSevice.getCreditCardMonths(month).subscribe(
      data=>{
        this.creditCardMonths = data;
        console.log("credit card months: "+JSON.stringify(data));
      }
    )

  }
  getStates(formGroupName:string){
    const formGroup =  this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup?.value.country.code;
    const countryName =formGroup?.value.country.name;

    console.log(`countryCode: ${countryCode}`)
    console.log(`country name: ${countryName}`)

    this.formSevice.getStates(countryCode).subscribe(
      data=>{
        if (formGroupName === "shippingAddress"){
          this.shippingAdressStates = data;
        }
        else{
          this.billingAdressStates = data;
        }

        //first item by default

       formGroup?.get('state')?.setValue(data[0]);
      }
    )

  }

}

