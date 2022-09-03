import { ToastController } from '@ionic/angular';
import { MainService } from './../main.service';
import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { Orders,Deliver } from '../models/order';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  productForm!: FormGroup;
  orders:any[]=[];
  basketList!: any;
  clickedImage: string;

  options: CameraOptions = {
    quality: 30,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE}
  @ViewChild('quantity', {static: true}) quantityElement: ElementRef;
  constructor(private router: Router, private service: MainService, private toastCtrl:ToastController,private camera: Camera) {}

  ngOnInit(){

    
    this.CompileOrders();
    this.captureImage()
  }
  captureImage() {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.clickedImage = base64Image;
    }, (err) => {
      console.log(err);
      // Handle error
    });
  }
  CompileOrders()
  {
    this.service.getProducts().subscribe(result => {
   
      let productList:any[] = result[0]
      productList.forEach((element) => {
        this.orders.push(element)
      })
    })};
   
  ////////////////////////////////////////////
  createOrder(product: Orders){
    const Deliveries  = {
      ...product,
    //  Quantity: parseInt((<HTMLInputElement>document.getElementById("quantity("+ product.id + ")")).value)
    };
    this.basketList = JSON.parse(localStorage.getItem('basket'));
    if(this.basketList == null){
      this.basketList = [];
      this.basketList.push(Deliveries );
      localStorage.setItem('basket',JSON.stringify(this.basketList));
    }
    else{
      this.basketList.push(Deliveries );
      localStorage.setItem('basket',JSON.stringify(this.basketList));
    }
const deliver:Deliver={
  DeliveriesV: [Deliveries]
};
    this.service.createOrder(deliver ).subscribe((res: any) => {
      
      this.deleteItem(product);
   
    });
  
    this.toastCtrl.create({
      
      message: 'Delivery was completed successfully!',
      position: 'middle',
      buttons: [
        {
          side: 'end',
          text: 'Close',
          role: 'cancel',
          handler: () => {
            console.log('Close clicked');
          }
        }
      ]
    }).then((obj) => {
      obj.present();
    });
  }


  
  deleteItem(item: any){
    //this.removeAlert();
    this.orders.splice(this.orders.indexOf(item),1);
    //localStorage.setItem('basket',JSON.stringify(this.basketList));
  }
}

