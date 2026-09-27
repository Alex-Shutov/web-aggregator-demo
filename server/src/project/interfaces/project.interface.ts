import { ProjectEntity } from '@app/project/entities/project.entity';

export interface ProjectResponse {
  project: ProjectEntity;
}

export interface ProjectsPageResponse {
  projects: ProjectEntity[];
  totalCount: number;
  page: number;
}
