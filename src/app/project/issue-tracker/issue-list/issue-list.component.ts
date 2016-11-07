import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../../../shared/project/project.service';
import { IssueTracker }   from '../../../shared/issue-tracker/issue-tracker';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent implements OnInit {

  private _issueTracker: IssueTracker;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this._issueTracker = this.projectService.currentIssueTracker;
  }

  get issues() {
    return this._issueTracker.issues;
  }

}
