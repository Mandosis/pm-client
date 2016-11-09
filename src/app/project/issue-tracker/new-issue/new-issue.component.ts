import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IssueTrackerService } from '../../../shared/issue-tracker/issue-tracker.service';

@Component({
  selector: 'app-new-issue',
  templateUrl: './new-issue.component.html',
  styleUrls: ['./new-issue.component.scss']
})
export class NewIssueComponent implements OnInit {

  error: string;
  title: string;
  body: string;

  constructor(
    private issueTrackerService: IssueTrackerService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  createIssue() {
    let data = {
      title: this.title,
      body: this.body
    };

    this.issueTrackerService.newIssue(data)
      .subscribe((result) => {
        if (!result.success) {
          this.error = 'Issue could not be saved. Please try again.';
          return;
        }
        this.router.navigate([`../${result.data.id}`]);
      });
  }

}
