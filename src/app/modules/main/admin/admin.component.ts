import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AppService } from '../../../services/app.service';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  isCollapsed = false;
  admin!: any;

  constructor(
    private router: Router,
    private dataService: DataService,
    private apiService: ApiService,
  ) {
    let stringAdmin = sessionStorage.getItem("admin");
    if (stringAdmin) {
      this.admin = JSON.parse(stringAdmin);
      this.dataService.setRole(this.admin.role);
      this.dataService.setAdminInf(this.admin);
    }
  }

  ngOnInit(): void {

    this.scheduleFunctionExecution();
  }

  scheduleFunctionExecution(): void {
    const delayInMilliseconds = 60 * 1000 * 40;
    console.log('token in admin');

    setInterval(() => {
      this.refreshToken();
    }, delayInMilliseconds);
  }

  refreshToken(): void {
    console.log('Function executed after 50 minutes');
    let token = sessionStorage.getItem("token");
    if (token) {
      this.apiService.refreshToken({ token: token }).subscribe({
        next: (res: any) => {
          sessionStorage.setItem("token", res.data)
          this.dataService.changeToken(res.data);
        }
      })
    }
  }

  logout() {
    let token = sessionStorage.getItem("token");
    if (token) {
      this.apiService.logOutAdmin({ token: token })
      sessionStorage.clear();
      this.dataService.setRole("USER");
      this.dataService.setAdminInf({});
      this.router.navigateByUrl("/")
    }
  }
}
