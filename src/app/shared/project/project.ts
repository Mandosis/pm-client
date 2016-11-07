import { User } from '../user/user';

export class Project {
  id: string;
  url: string;
  title: string;
  description: string;
  admins: User[];
  members: User[];
  issue_tracker: string;
  created: Date;

  constructor(project: any) {
    this.id = project._id;
    this.url = project.url;
    this.title = project.title;
    this.description = project.description;
    this.admins = project.admins;
    this.members = project.members;
    this.issue_tracker = project.issue_tracker;
    this.created = project.created;
  }
}
