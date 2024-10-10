import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { Product } from '../../../model/product/product.module';
import { NgFor, NgIf } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [NgIf,FormsModule, NgFor,RouterLink],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit{

  form:FormGroup;

  isSaved:boolean = false;
  isError:boolean = false;
  // product:any;
  id:any;
  title:string="";
  c:string="";
  category:string[] = ['LAPTOP','DESKTOP','TABLET'];
  price:number=0.0;
  description:string="";
  quantity:number=0;

  constructor(
    private service: ProductService,
    private act:ActivatedRoute,
    private router: Router
  ){

    

    // this.product = new Product();
    // this.service.getAllCategory().subscribe({
    //   next:(data)=>{
    //     this.category=data;
    //   },
    //   error:(err)=>{
    //     console.log(err)
    //   }
    // })
  }

  ngOnInit(): void {

    this.id = this.service.getProductSelected().id

    // this.act.paramMap.subscribe(params => {
    //   this.id = params.get("id")
    // })
    this.category = ['LAPTOP','DESKTOP','TABLET'];
    console.log(this.category);

    this.fetchProduct();

    // console.log(this.product);
    this.isSaved = false
    
  }

  fetchProduct(){
    this.service.findById(this.id).subscribe({
      next: (data) => {
        console.log(data)
        this.title = data.title
        this.c = data.category
        this.description = data.description
        this.price = data.price
        this.quantity = data.quantity
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  onSave(){

    this.service.editProduct(this.id, {
      "title":this.title,
      "category":this.c,
      "description": this.description,
      "price": this.price,
      "quantity": this.quantity
    })
    .subscribe({
      next: (data) => {
        console.log(data)
        this.router.navigateByUrl("/view-all-products")
      },
      error: (err) => {
        console.log(err);
      }
    })
    console.log(this.title);

    // this.product.title = this.title;
    // this.product.category = this.c;
    // this.product.price = this.price;
    // this.product.description = this.description;
    // this.product.quantity = this.quantity;

    // console.log(this.product);
  //   this.service.saveProduct(
      
  //     // this.product

  //     {
  //     "title" : this.title,
  //     "category" : this.c,
  //     "price" : this.price,
  //     "description" : this.description,
  //     "quantity" : this.quantity
  //   }
  // ).subscribe({
  //     next: ()=> {
  //       this.isSaved = true;
  //       this.isError = false;
  //       console.log("Saved");
  //     },
  //     error: (err) => {
  //       console.log(err)
  //       this.isError = true;
  //       this.isSaved = false;
  //     }
  //   })
  }

  resetText(){
    this.isSaved = false;
    this.isError = false;
  }


}
