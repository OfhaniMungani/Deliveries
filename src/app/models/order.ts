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
  }
  export interface Deliver {
    DeliveriesV:Orders[]
  }