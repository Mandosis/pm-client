export class User {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  admin: boolean;
  joined: Date;

  constructor(user: any) {
    this.id = user._id || user.id;
    this.username = user.username;
    this.email = user.username;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.admin = user.admin;
    this.joined = user.joined;
  }
}
