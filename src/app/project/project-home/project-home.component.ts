import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../../shared/project/project.service';
import { Project } from '../../shared/project/project';

@Component({
  selector: 'app-project-home',
  templateUrl: './project-home.component.html',
  styleUrls: ['./project-home.component.scss']
})
export class ProjectHomeComponent implements OnInit {

  project: Project;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    let url = this.projectService.url;
    this.projectService.getByUrl(url)
      .subscribe((project) => {
        this.project = new Project(project);
      });
  }

}
