import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
  login(userName: string, password: string): boolean {
    if (userName === "user" && password === "password") {
      localStorage.setItem("userName", userName);
      return true;
    }

    return false;
  }

  logout(): boolean {
    localStorage.removeItem("userName");
    return true;
  }

  getUser(): string {
    return localStorage.getItem("userName");
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }
}
