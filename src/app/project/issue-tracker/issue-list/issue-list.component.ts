import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../../../shared/project/project.service';
import { IssueTracker }   from '../../../shared/issue-tracker/issue-tracker';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent implements OnInit {

  issueTracker: IssueTracker;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.issueTracker = this.projectService.currentIssueTracker;
    console.log('This projects issuetracker:', this.issueTracker);
  }
  

}
