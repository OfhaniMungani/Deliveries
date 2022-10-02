export interface Orders {
    id: number;
    firstName: string;
    surname: string;
    streetAddress: string;
    city:string;
    country:string;
    province:string;
    suburb:string;
    date:Date;
  PhoneNumber:number;
  img:string;
  }
  export interface Deliver {
    DeliveriesV:Orders[]
  }