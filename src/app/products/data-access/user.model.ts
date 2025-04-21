export class User{
  id: number;
  username: string;
  firstname: string;
  email: string;
  token: string;
  type: string;

  constructor(id: number, username: string, firstname: string, email: string, token: string,type: string) {
    this.id = id;
    this.username = username;
    this.firstname = firstname;
    this.email = email;
    this.token = token;
    this.type = type;
  }
}
