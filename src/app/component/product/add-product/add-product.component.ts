import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit{
  addProductForm: FormGroup

  isSaved:boolean = false;
  isError:boolean = false;

  constructor(private service: ProductService, private router: Router){
    this.addProductForm = new FormGroup({
      category: new FormControl('',Validators.required),
      title: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
      price: new FormControl('',Validators.required),
      quantity: new FormControl('',Validators.required),
    })
  }
  ngOnInit(): void {
    this.isSaved = false
    this.isError = false;
  }

  onSubmit(){
    let data = {
        title: this.addProductForm.value.title,
        category: this.addProductForm.value.category,
        description: this.addProductForm.value.description,
        price: this.addProductForm.value.price,
        quantity: this.addProductForm.value.quantity
      }
      console.log("Saved data=");
      console.log(data);


      this.service.saveProduct(
        data
        // {
        // "title" : data.title,
        // "category":data.category,
        // "description":data.description,
        // "price":data.price,
        // "quantity":data.quantity
          
      // }
    )
      .subscribe({
        next: (data) => {
          this.isSaved = true;
        this.isError = false;
          console.log(data)
          this.router.navigateByUrl("/view-all-products")
        },
        error: (err) => {
          this.isError = true;
          this.isSaved = false;
          console.log(err)
        }
      })

     
      

  }

  resetText(){
    this.isSaved = false;
    this.isError = false;
  }

}