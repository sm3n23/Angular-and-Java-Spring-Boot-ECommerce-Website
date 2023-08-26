import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { register } from '@okta/okta-auth-js';
import { Register } from 'src/app/common/register';
import { RegisterService } from 'src/app/services/register.service';
import { ShopValidators } from 'src/app/validators/shop-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerFormGroup!:FormGroup;

  hasSellerSegment:boolean=false;
  hascustomerSegment:boolean=false;

  constructor(private formbuilder:FormBuilder,
    private router:Router,
    private route: ActivatedRoute,
    private registerService:RegisterService){}


  ngOnInit(): void {


    this.checkIfRouteHasSellerSegment();
    
    this.registerFormGroup = this.formbuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      userName: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
      password: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
      repeatedPassword: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),

    })
  }

  checkIfRouteHasSellerSegment() {
    const currentUrlSegments = this.router.url.split('/');
    this.hasSellerSegment = currentUrlSegments.includes('seller');
    this.hascustomerSegment = currentUrlSegments.includes('customer');
    
    console.log('Route contains "seller" segment:', this.hasSellerSegment);
    console.log('Route contains "customer" segment:', this.hascustomerSegment);
  }

  get firstName(){return this.registerFormGroup.controls['firstName']}
  get lastName(){return this.registerFormGroup.controls['lastName']}
  get email(){return this.registerFormGroup.controls['email']}
  get userName(){return this.registerFormGroup.controls['username']}
  get password(){return this.registerFormGroup.controls['password']}
  get repeatedPassword(){return this.registerFormGroup.controls['repeatedPassword']}



  onSubmit(){


    if(this.registerFormGroup.value.password  === this.registerFormGroup.value.repeatedPassword){

      let user = new Register();

      user.firstName = this.registerFormGroup.value.firstName;
      user.lastName = this.registerFormGroup.value.lastName;
      user.email = this.registerFormGroup.value.email;
      user.username = this.registerFormGroup.value.userName;
      user.password = this.registerFormGroup.value.password;

      if(this.hascustomerSegment){
        user.role='customer';
      }

      if(this.hasSellerSegment){
        user.role='seller';
    
      }
      

      this.registerService.createUser(user).subscribe({
        next:res=>{
          alert(`account created successfully ${res}`)
        },
        error:err=>{
          alert(`there was an error ${err.message}`)
        }
      });

    } else{
      alert('confirm password failed')
      console.error(`there was an error`);
      
    }
    

  }

}
