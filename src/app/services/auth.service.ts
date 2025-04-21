import {computed, effect, inject, Injectable, signal} from "@angular/core";
import {Observable, tap} from "rxjs";
import {User} from "../products/data-access/user.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private readonly currentUserSignal = signal<User | null>(this.getUserFromStorage());
  public isAuthenticated = computed(() => !!this.currentUserSignal());
  public user = computed(() => this.currentUserSignal());
  private readonly tokenApiPath = `${environment.backEndUrl}/token`;
  private readonly ADMIN_EMAIL = "admin@admin.com";
  constructor(private http: HttpClient,private router: Router) {
    effect(() => {
      const user = this.currentUserSignal();
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      } else {
        localStorage.removeItem('currentUser');
      }
    });
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(this.tokenApiPath, { email, password })
      .pipe(
        tap(user => {
          this.currentUserSignal.set(user);
        })
      );
  }

  logout(): void {
    this.currentUserSignal.set(null);
  }

  private getUserFromStorage(): User | null {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }
  getToken(): string | null {
    const user = this.currentUserSignal();
    return user ? user.token : null;
  }
  getTokenType(): string {
    const user = this.currentUserSignal();
    return user?.type || 'Bearer';
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  isLoggedInOrElseRedirect(): boolean {
    if(this.isLoggedIn())
      return true;
    this.router.navigateByUrl('/login');
    return false;
  }
  isAdmin():boolean{
    const user = this.currentUserSignal();
    return user ? user.email === this.ADMIN_EMAIL : false;
  }
}
