import { Injectable, inject, signal } from "@angular/core";
import { Product } from "./product.model";
import { HttpClient } from "@angular/common/http";
import {catchError, map, Observable, of, tap, throwError} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: "root"
}) export class ProductsService {

    private readonly http = inject(HttpClient);
    private readonly path = "/api/products";
    private productApiPath = `${environment.backEndUrl}/products`;
    private readonly _products = signal<Product[]>([]);

    public readonly products = this._products.asReadonly();

  public get(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productApiPath).pipe(
      catchError((error) => {
        console.error(error);
        return this.http.get<Product[]>("assets/products.json");
      }),
      tap((products) => this._products.set(products)),
    );
  }

  public create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productApiPath, product).pipe(
      catchError((err: any) => {
        console.error("Post product error !", err);
        return throwError(() => new Error("Échec de la création du produit"));
      }),
      tap((result: Product) => {
        if (result) {
          this._products.update(products => products ? [result, ...products] : [result]);
        }
      }),
    );
  }

    public update(product: Product): Observable<boolean> {
        return this.http.patch<boolean>(`${this.productApiPath}/${product.id}`, product).pipe(
            catchError((err) => {
              console.error("Patch product error !",err)
              return of(true);
            }),
            tap(() => this._products.update(products => {
                return products.map(p => p.id === product.id ? product : p)
            })),
        );
    }

    public delete(productId: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.productApiPath}/${productId}`).pipe(
            catchError(() => {
                return of(true);
            }),
            tap(() => this._products.update(products => products.filter(product => product.id !== productId))),
        );
    }

}
