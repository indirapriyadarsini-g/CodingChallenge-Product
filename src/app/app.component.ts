import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductViewComponent } from "./component/product/product-view/product-view.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'product-app';
}
