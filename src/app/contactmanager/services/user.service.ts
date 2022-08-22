import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _users: BehaviorSubject<User[]>;
  //LEARNING: We add this in order to not expose our internal datastore.
  //This will allow us to 1, expose an what we want,
  //2, allow external components a way to subscribe to data updates for user dataset

  private dataStore: {
    users: User[];
  };
  constructor(private http: HttpClient) {
    this.dataStore = { users: [] };
    this._users = new BehaviorSubject<User[]>([]);
  }

  get users(): Observable<User[]> {
    return this._users.asObservable();
  }

  loadAll() {
    const usersUrl = 'https://angular-material-api.azurewebsites.net/users';
    return this.http.get<User[]>(usersUrl).subscribe(
      (data) => {
        this.dataStore.users = data;
        this._users.next(Object.assign({}, this.dataStore).users);
        //LEARNING: Make a shallow copy of our datastore users data so that external components that access this data are not able to
        // manipulate, modify this data.
      },
      (error) => {
        console.log('Failed to fetch users.');
      }
    );
  }

  userById(id: any): User {
    return this.dataStore.users.find((u) => u.id == id);
  }
}
