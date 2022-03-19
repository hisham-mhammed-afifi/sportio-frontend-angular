import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/IUser';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: IUser[] = [];

  constructor(private _usersServices: UsersService) {}

  ngOnInit(): void {
    this._usersServices.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }
}
