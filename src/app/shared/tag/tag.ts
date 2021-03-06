import { Issue } from '../issue-tracker/issue';

export class Tag {
  id: string;
  title: string;
  issues: Issue[];

  constructor(tag: any) {
    this.id = tag._id;
    this.title = tag.title;
    this.issues = tag.issues;
  }
}
