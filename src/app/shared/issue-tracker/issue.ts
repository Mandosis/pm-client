import { Tag } from './tag';
import { User } from '../user/user';
import { Comment } from './comment';

export class Issue {
  id: string;
  issueTracker: string;
  title: string;
  body: string;
  tags: Tag[];
  author: User;
  assignees: User[];
  created: Date;
  edited: Date;
  comments: Comment[];

  constructor(issue: any) {
    this.id = issue._id || issue.id;
    this.issueTracker = issue.issue_tracker || issue.issueTracker;
    this.title = issue.title;
    this.body = issue.body;
    this.tags = issue.tags;
    this.author = issue.author;
    this.assignees = issue.assigness || [];
    this.created = issue.created;
    this.edited = issue.edited || null;
    this.comments = issue.comments || [];
  }
}
