import { Component, OnInit, ViewChild } from '@angular/core';
import { IOrder } from 'src/app/interfaces/IOrder';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss'],
})
export class OrdersTableComponent implements OnInit {
  orders: IOrder[] = [];

  constructor(
    private _orderServices: OrdersService,
    private _usersServices: UsersService
  ) {}

  ngOnInit(): void {
    this._orderServices.getAllOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }
}
