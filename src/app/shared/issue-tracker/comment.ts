import { User } from '../user/user';

export class Comment {
  author: User;
  body: string;
  created: Date;
  edited: Date;

  constructor(comment: any) {
    this.author = comment.author;
    this.body = comment.body;
    this.created = comment.created;
    this.edited = comment.edited;
  }
}
