import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../shared/project/project.service';
import { Project } from '../../shared/project/project';

@Component({
  selector: 'app-project-home',
  templateUrl: './project-home.component.html',
  styleUrls: ['./project-home.component.scss']
})
export class ProjectHomeComponent implements OnInit {

  project: Project;

  constructor(
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.projectService.getByUrl(this._projectUrl)
      .subscribe((result) => {
        this.project = new Project(result.data);

        console.log('project', this.project);
      });
  }

  private get _projectUrl() {
    return this.projectService.currentUrl;
  }

}
