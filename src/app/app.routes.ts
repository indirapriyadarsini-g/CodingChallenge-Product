
import { Routes } from '@angular/router';
import { ProductViewComponent } from './component/product/product-view/product-view.component';
import { ProductDetailsComponent } from './component/product/product-details/product-details.component';
import { ProductEditComponent } from './component/product/product-edit/product-edit.component';
import { AddProductComponent } from './component/product/add-product/add-product.component';

export const routes: Routes = [
    {
        "path":"",component:ProductViewComponent
    },
   {
    "path":"view-all-products", component : ProductViewComponent
   },
   {
    "path":"product-details", component:ProductDetailsComponent
   },
   {
    "path":"product-edit", component:ProductEditComponent
   },
   {
    "path":"add-product", component:AddProductComponent
   }
];
