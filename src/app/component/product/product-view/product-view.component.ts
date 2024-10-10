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

  products: any[] = []
  stringMsg: string = ""
  viewProductDiv: boolean = false
  totalPages : number =0;  
  numArry:number[]=[];
  counter: number=0;
  page:number=0;
  size:number=5; 
  last: boolean=false; 
  first: boolean=true;

  ngOnInit(): void {
    this.fetchAllProducts();
    this.isDeleted = false;
  }

  fetchAllProducts(){
    this.service.getAllProducts().subscribe({
      next: (data) => {
        console.log(data);
        this.products = data;
      }
    })
  }

  // fetchAllProducts(){
  //   this.ervice.getAll(this.page, this.size).subscribe({
  //     next: (data) => {
  //       this.products=data.content
  //       this.totalPages = data.totalPages; 
  //       this.last = data.last; 
  //       this.first = data.first; 

  //       if(this.counter === 0){
  //        let i=0;
  //        while(i<this.totalPages){
  //            this.numArry.push(i);
  //            i++;
  //          };
  //        }
  //      this.counter = this.counter+1;
  //     },
  //     error: (err) => {
  //       console.log(err)
  //     }

  //   })
  // }

  // onPrev(){
  //   this.pageNumber = this.pageNumber - 1;
  //   this.fetchAllProducts();
  // }

  // onNext(){
  //   this.pageNumber=this.pageNumber+1;
  //   this.fetchAllProducts();
  // }

  // onPageClick(n:number){
  //   this.pageNumber=n;
  //   this.fetchAllProducts();
  // }

  getDetails(prod: any) {
    this.service.setProductSelected = prod;
    this.router.navigateByUrl("/product-details");
    }
    
  onEdit(prod:any){
    this.service.setProductSelected(prod);
    let id = prod.id;
    this.router.navigateByUrl("/product-edit");
  }

  p:any;

  onDelete(id:any){
    const index = this.products.findIndex(item => item.id === id);
        
        if (index !== -1) {
          this.products.splice(index, 1);
        }
    // this.products = this.products.filter( (p) => p.product.id != prod.id );
    this.service.deleteProduct(id).subscribe({
      next: ()=> console.log("deleted"),
      error: (err)=> console.log(err)
    })
    this.isDeleted = true;

  }


}
