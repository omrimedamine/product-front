export class Product {
  id?: number;
  code: string;
  name?: string;
  description?: string;
  image?: string;
  category?: string;
  price: number;
  quantity: number;
  internalReference?: string;
  shellId: number;
  inventoryStatus: "INSTOCK" | "LOWSTOCK" | "OUTOFSTOCK";
  rating: number;
  createdAt?: number;
  updatedAt?: number;


  constructor(rating: number = 0, shellId: number = 0, quantity: number = 0, price: number = 0,code:string ="", inventoryStatus: "INSTOCK" | "LOWSTOCK" | "OUTOFSTOCK" = "INSTOCK") {
    this.price = price;
    this.inventoryStatus = inventoryStatus;
    this.quantity = quantity;
    this.shellId = shellId;
    this.rating = rating;
    this.code = code;
  }
}
