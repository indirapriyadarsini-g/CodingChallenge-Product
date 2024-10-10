import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class Product {
  id:number;
  title:string;
  category:string;
  price:number;
  description:string;
  quantity:number;
 }
