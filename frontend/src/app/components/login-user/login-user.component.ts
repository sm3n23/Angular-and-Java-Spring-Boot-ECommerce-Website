import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/common/login';
import { RegisterService } from 'src/app/services/register.service';
import { UserService } from 'src/app/services/user-service.service';
import { ShopValidators } from 'src/app/validators/shop-validators';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent {

  loginFormGroup!:FormGroup;

  user:any;


  constructor(private formbuilder:FormBuilder,
    private userService: UserService,
    private router:Router,
    private registerService:RegisterService){}


  ngOnInit(): void {


    this.userService.user$.subscribe(user => {
      this.user = user;

    });
    
    this.loginFormGroup = this.formbuilder.group({
      
      username: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
      password: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace])

    })
  }

  
  get userName(){return this.loginFormGroup.controls['username']}
  get password(){return this.loginFormGroup.controls['password']}
  
  onSubmit(){

    let login = new Login();
    login.username = this.loginFormGroup.value.username;
    login.password = this.loginFormGroup.value.password;

    this.registerService.login(login).subscribe(
      (response:any)=>{

        this.userService.setUser(response);

        if(this.user.role=='customer'){
        this.router.navigateByUrl("/home");
        }
        if(this.user.role=='seller'){
          this.router.navigateByUrl(`/seller/${this.user.id}`)
        }

      },
      (error:any)=>{
        alert('invalid cred')
      }
    )

  }

}
