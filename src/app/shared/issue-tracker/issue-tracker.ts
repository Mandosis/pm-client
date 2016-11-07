import { Issue } from '../issue/issue';
import { Tag }   from '../tag/tag';

export class IssueTracker {
  id: string;
  project: string;
  tags: Tag[];
  issues: Issue[];

  constructor(tracker: any) {
    this.id = tracker._id || tracker.id;
    this.project = tracker.project;
    this.tags = tracker.tags;
    this.issues = tracker.issues;
  }
}
