import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  orders:any[]=[];
 DeliveryList!:[]

  constructor(private service: MainService) {}

  ngOnInit(){

    
    this.CompileDeliveredOrders()
  }
  CompileDeliveredOrders()
  {
    this.service.getOrders().subscribe(result => {
   
      let DeliveryList:any[] = result[0]
      DeliveryList.forEach((element) => {
        this.orders.push(element)
      })
    })};
}

