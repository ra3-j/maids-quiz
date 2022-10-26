import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';
import { Page } from 'src/models/page';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    public httpClient: HttpClient,
  ) { }

  public getUsers = (page:number) => {
    return this.httpClient.get<Page>(`https://reqres.in/api/users?page=${page}`).pipe(shareReplay());
  }

  public getUserById = ( userId: string ) => {
    return this.httpClient.get<User>(`https://reqres.in/api/users/${userId}`).pipe(shareReplay());
	}
}
