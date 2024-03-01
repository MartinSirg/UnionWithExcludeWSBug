import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';

enum OrderType {
  PhysicalSale ,
  OnlineSale,
  PhysicalReturn ,
  OnlineReturn
}

type ReturnOrderType = OrderType.PhysicalReturn | OrderType.OnlineReturn;
type SalesOrderType = Exclude<OrderType, ReturnOrderType>
// IF SalesOrderType is defined like below, everything works. Exclude seems to cause problems.
// type SalesOrderType = OrderType.PhysicalSale | OrderType.OnlineSale

interface SalesOrder {
  type: SalesOrderType;
  soldItemName: string
}

interface ReturnOrder  {
  type: ReturnOrderType
  returnReason: string
}

type Order = SalesOrder | ReturnOrder;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  OrderType = OrderType;

  order1: Order = {type: OrderType.OnlineReturn, returnReason: "Damaged during shipping"};
  order2: Order = {type: OrderType.PhysicalSale, soldItemName: "iPhone 17 Ultra Mega Pro Max+"};

  ngOnInit() {
    if (this.order1.type === OrderType.OnlineReturn){
      const returnOrder = this.order1;
      console.log("Return reason:", returnOrder.returnReason) //BUG IN WEBSTORM: Syntax highlighting does not work for returnReason
    }

    if (this.order2.type === OrderType.PhysicalSale){
      const salesOrder = this.order2;
      console.log('Sold item name:', salesOrder.soldItemName)
    }
  }
}
