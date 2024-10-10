import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { Router, RouterLink } from '@angular/router';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ProductEditComponent } from '../product-edit/product-edit.component';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [NgFor,RouterLink,NgIf],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent implements OnInit{

  isDeleted:boolean = false;

  constructor(
    private service: ProductService,
    private router: Router,

  ){}

  products:any;
  totalPages:number=0;
  pageNumber:number=0;
  pageSize:number=5;
  counter:number = 0;
  pages:number[] = [];
  first:boolean = false;
  last:boolean = false;

  ngOnInit(): void {
    this.fetchAllProducts();
    this.isDeleted = false;
  }

  fetchAllProducts(){
    this.service.getAllProducts(this.pageNumber,this.pageSize).subscribe({
      next: (data) => {
        console.log(data);
        this.products = data.content;
        this.first = data.first;
        this.last = data.last;
        if(this.counter==0){
          let i=0;
          while(i<this.totalPages){
                this.pages.push(i);
                i++;
          };
        }
        this.counter=this.counter+1;
        this.isDeleted = false;
      },
      error: (err) => console.log(err)
    })
  }

  onPrev(){
    this.pageNumber = this.pageNumber - 1;
    this.fetchAllProducts();
  }

  onNext(){
    this.pageNumber=this.pageNumber+1;
    this.fetchAllProducts();
  }

  onPageClick(n:number){
    this.pageNumber=n;
    this.fetchAllProducts();
  }

  getDetails(prod: any) {
    this.service.setProductSelected = prod;
    this.router.navigate([ProductDetailsComponent])
    }
    
  onEdit(prod:any){
    this.service.setProductSelected(prod);
    this.router.navigate([ProductEditComponent])
  }

  p:any;

  onDelete(prod:any){
    // const index = this.products.findIndex(item => item.cartProduct.id === cpId);
        
    //     if (index !== -1) {
    //       this.cartProducts.splice(index, 1);
    //     }
    this.products = this.products.filter( (p: { product: { id: number; }; }) => p.product.id != prod.id );
    this.isDeleted = true;
  }


}
