import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Page } from 'src/models/page';
import { User } from 'src/models/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  public users:User[]=[];
  public totalPagesCount =0;
  public usersCountInPage = 0;
  public usersTotalCount = 0;
  public pageIndex = 0;
  public displayedColumns: string[] = ['email','avatar','first_name','last_name'];
  public pageCls = 6;
  public searchField  ='';
  public filteredUSersList:User[]=[];
  constructor(
    private userService:UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.fetchPage({pageIndex:this.pageIndex});
  }

  fetchPage(page:any){
    this.searchField = '';
    this.pageIndex = page.pageIndex + 1;
    this.userService.getUsers(this.pageIndex).subscribe((res:Page)=>{
      this.users= res.data;
      this.filteredUSersList = this.users;
      this.totalPagesCount = res.total_pages;
      this.usersCountInPage = res.per_page;
      this.usersTotalCount = res.total;
    });
  }

  goToUserDetails(userId:number){
    this.router.navigate( [ `/user/${userId}` ] );
  }

  onResize(event:any) {
    this.pageCls = (event.target.innerWidth <= 800) ? 1 : 6;
  }

  search() {
    if(Number(this.searchField) > this.usersTotalCount){
      this.filteredUSersList = [];
    }else{
      this.searchField?this.filteredUSersList = this.users.filter(user=>user.id === Number(this.searchField)):this.filteredUSersList=this.users;
        if(!this.filteredUSersList.length && this.searchField){
          this.userService.getUserById(this.searchField).subscribe((res: any)=>{
            const user = res.data;
            this.filteredUSersList.push(user);
          });
      }
    }
  }
}
