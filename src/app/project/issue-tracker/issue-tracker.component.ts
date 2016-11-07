import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../../shared/project/project.service';
import { IssueTracker } from '../../shared/issue-tracker/issue-tracker';

@Component({
  selector: 'app-issue-tracker',
  templateUrl: './issue-tracker.component.html',
  styleUrls: ['./issue-tracker.component.scss']
})
export class IssueTrackerComponent implements OnInit {

  private _issueTracker: IssueTracker;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this._issueTracker = this.projectService.currentIssueTracker;
    console.log(this._issueTracker);
  }

  get issueTracker() {
    return this._issueTracker;
  }

}
