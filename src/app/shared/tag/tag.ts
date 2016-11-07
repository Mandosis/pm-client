import { Issue } from '../issue/issue';

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
