import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrl: './register-admin.component.css'
})
export class RegisterAdminComponent {
  request:any= {
    name: '',
    phone: '',
    email: '',
    password: ''
  }

  passwordType: string = 'password';

  constructor(
    private apiService: ApiService,
    private dataService: DataService,
    private msg: NzMessageService,
    private router: Router
  ){}
  
  handleSignUp(){
    // let request = {
    //   name: "Đỗ Thị Linh",
    //   phone: "0962027042",
    //   email: "linh@gmail.com",
    //   password: "12345678"
    // }

    this.apiService.signUpAdmin(this.request).subscribe({
      next: (res: any) => {
        this.msg.success("Đăng ký tài khoản thành công!");
        this.dataService.changeStatusLoginModal(true);
      }
    })
  }

  goToLogin(){
    this.router.navigateByUrl("/login")
  }

  changePasswordType(type: string){
    this.passwordType = type
  }
}
