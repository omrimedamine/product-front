import {computed, Injectable, Signal, signal} from "@angular/core";
import {CartItem} from "../products/data-access/cart-Item.model";
import {Product} from "../products/data-access/product.model";

@Injectable({
  providedIn: 'root'
})
export class CartService{
  private readonly cartItems = signal<CartItem[]>([]);
  public itemCount = computed(() => {
    return this.cartItems().reduce((count, item) => count + item.cartQuantity, 0);
  });
  public totalAmount = computed(() => {
    return this.cartItems().reduce((total, item) => total + (item.price * item.cartQuantity), 0);
  });
  constructor() {}
  getCartItems(): Signal<CartItem[]> {
    return this.cartItems.asReadonly();
  }
  addToCart(product: Product): void {
    const currentItems = this.cartItems();
    const existingItemIndex = currentItems.findIndex(item =>
      (item.id === product.id)
    );

    if (existingItemIndex !== -1) {
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        cartQuantity: updatedItems[existingItemIndex].cartQuantity + 1
      };
      this.cartItems.set(updatedItems);
    } else {
      this.cartItems.update(items => [
        ...items,
        {
          ...product,
          cartQuantity: 1
        }
      ]);
    }
  }
  removeFromCart(identifier: number): void {
    this.cartItems.update(items => items.filter(item => item.id !== identifier));
  }
  updateCartItemQuantity(identifier: number, quantity: number): void {
    const currentItems = this.cartItems();
    const itemIndex = currentItems.findIndex(item => item.id === identifier
    );

    if (itemIndex !== -1) {
      const updatedItems = [...currentItems];
      if (quantity <= 0) {
        this.removeFromCart(identifier);
      } else {
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          cartQuantity: quantity
        };
        this.cartItems.set(updatedItems);
      }
    }
  }
  clearCart(): void {
    this.cartItems.set([]);
  }
}
