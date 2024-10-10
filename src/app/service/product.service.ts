import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getAllProductsApi = 'http://localhost:8084/view-all-products'

  getAllProducts(page:number,size:number):Observable<any>{
    return this.http.get(this.getAllProductsApi+'?page='+page+'&size='+size);
  }

  findByIdApi = 'http://localhost:8084/find-by-id/'

  findById(id:number):Observable<any>{
    return this.http.get(this.findByIdApi+id)
  }

  saveProductApi = 'http://localhost:8084/save-product'

  saveProduct(product:any):Observable<any>{
    console.log("in service");
    console.log(product);
    return this.http.post(this.saveProductApi,product)
  }

  deleteProductApi = 'http://localhost:8084/delete-product/'

  deleteProduct(id: number):Observable<any>{
    return this.http.delete(this.deleteProductApi+id)
  }

  editProductApi = 'http:localhost:8084/edit-product/'

  editProduct(id:number, product:any):Observable<any>{
    return this.http.put(this.editProductApi+id,product)
  }

  productSelected:any;

  getProductSelected(){
    return this.productSelected;
  }

  setProductSelected( product: any){
    this.productSelected = product
  }


}
