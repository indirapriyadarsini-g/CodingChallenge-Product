import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { Router } from '@angular/router';
import { ProductEditComponent } from '../product-edit/product-edit.component';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

constructor(
  private service:ProductService,
  private router: Router
){}

product:any;

ngOnInit(): void {
  this.product = this.service.getProductSelected();
  this.service.findById(this.product.id)
}

toEdit() {
  this.service.setProductSelected(this.product)
  this.router.navigate([ProductEditComponent]);
}


}
