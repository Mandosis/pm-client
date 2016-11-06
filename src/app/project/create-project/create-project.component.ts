import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { ProjectService }    from '../../shared/project/project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  title: string;
  description: string;
  error: string;

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  submit() {
    this.projectService.create(this.title, this.description)
      .subscribe((result) => {
        if (result.success) {
          this.router.navigate([`/project/${result.data.url}`]);
        } else {
          this.error = 'Creating project failed';
        }
      });

  }

}
