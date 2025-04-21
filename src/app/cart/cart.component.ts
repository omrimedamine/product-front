import {Component, effect, inject, signal} from "@angular/core";
import {BadgeModule} from "primeng/badge";
import { InputNumberModule } from "primeng/inputnumber";
import {TableModule} from "primeng/table";
import {ImageModule} from "primeng/image";
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {CartService} from "../services/cart.service";
import {CartItem} from "../products/data-access/cart-Item.model";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    SidebarModule,
    BadgeModule,
    InputNumberModule,
    TableModule,
    ImageModule
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartService = inject(CartService);
  displayCart = signal(false);

  sidebarVisible = false;

  constructor() {
    effect(() => {
      this.sidebarVisible = this.displayCart();
    });
  }

  toggleCartDisplay(): void {
    this.displayCart.update(value => !value);
  }

  onSidebarHide(): void {
    this.displayCart.set(false);
  }

  removeItem(item: CartItem): void {
    if(item.id == null) {
      console.error("item.id is null");
      throw Error("item is null");
    } else {
      this.cartService.removeFromCart(item.id);
    }
  }

  updateQuantity(item: CartItem, quantity: number): void {
    if(item.id == null) {
      console.error("item.id is null");
      throw Error("item is null");
    }else {
      this.cartService.updateCartItemQuantity(item.id, quantity);
    }
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  getItemTotal(item: CartItem): number {
    return item.price * item.cartQuantity;
  }
}
