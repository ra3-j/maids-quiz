import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public userId = '';
  public user: User | undefined;

  constructor(
    private router: Router,
    private userService:UserService,
  ) { }

  ngOnInit(): void {
    this.userId = this.router.url.split( '/' )[ 2 ];
    this.userService.getUserById(this.userId).subscribe((res: any)=>{
      this.user = res?.data;
    });
  }

  goToList(){
    this.router.navigate(['']);
  }

}
