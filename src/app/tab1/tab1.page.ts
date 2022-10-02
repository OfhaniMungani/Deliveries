import {LoadingController, Platform,ToastController } from '@ionic/angular';
import { MainService } from './../main.service';
import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { Orders,Deliver } from '../models/order';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { finalize } from 'rxjs/operators';

const IMAGE_DIR = 'stored-images';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  productForm!: FormGroup;
  orders:any[]=[];
  basketList!: any;
  userImg: any = '';
  base64Img = '';
 
  cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    allowEdit: true
   }
   gelleryOptions: CameraOptions = {
    quality: 100,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    allowEdit: true
    }
  @ViewChild('quantity', {static: true}) quantityElement: ElementRef;
  constructor(private loadingCtrl: LoadingController,private plt: Platform,private router: Router, private service: MainService, private toastCtrl:ToastController,private camera: Camera) {}

  ngOnInit(){

    this.userImg = 'assets/imgs/logo.png';
    this.CompileOrders();
   
  }
  openCamera() {
    this.camera.getPicture(this.cameraOptions).then((imgData) => {
    console.log('image data =>  ', imgData);
    this.base64Img = 'data:image/jpeg;base64,' + imgData;
    this.userImg = this.base64Img;
    }, (err) => {
    console.log(err);
    })
   }
   
    openGallery() {
      this.camera.getPicture(this.gelleryOptions).then((imgData) => {
       console.log('image data =>  ', imgData);
       this.base64Img = 'data:image/jpeg;base64,' + imgData;
       this.userImg = this.base64Img;
       }, (err) => {
       console.log(err);
       })
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
      img: this.userImg
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

