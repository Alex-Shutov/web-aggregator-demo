import { RecoilValueReadOnly, selector } from "recoil";
import projectApi from "@components/Project/projects.api";
import {
  currentProjId,
} from "@components/Project/projects.atom";
import { currentEventAtom } from "@components/Home/home.atoms";
import {
  currentProjectPaginationPage,
  currentSortType,
} from "@components/Home/components/SelectionProjects/Pagination/pagination.atom";
import { allCategoriesList } from "@components/Home/components/Categories/categories.atoms";
import { ICategoryProps } from "@components/Home/components/Categories/categories.types";

// export const filterProjectByCategories = selector({
//   key:'project_filter_by_categories',
//   get: ({ get }) => {
//     const selectedSubCategories = get(allCategoriesList);
//     const allProjects = get(allProjectsList)
//
//     if (selectedSubCategories.length === 0) {
//       return allProjects;
//     }
//
//     return allProjects.projects.filter((project) =>
//       project.categories?.some((category) =>
//         selectedSubCategories.includes(category)
//       )
//     );
// }})

export const getAllProject: RecoilValueReadOnly<any> = selector({
  key: "get_all_project",
  get: async ({ get }) => {
    const categoriesIds = getCheckedCategoriesIds(get(allCategoriesList));
    const eventId = get(currentEventAtom);
    const page = get(currentProjectPaginationPage);
    const sortType = get(currentSortType);
    const limit = 10;
    if (eventId?.id) {
      const response = await projectApi.getProjectsByEvent(
        eventId.id,
        categoriesIds,
        page,
        limit,
        sortType,
      );
      if (response.status === "success") {
        return response.body;
      }
    }
  },
});

export const getCurrentProject: RecoilValueReadOnly<any> = selector({
  key: "get_project",
  get: async ({ get }) => {
    const currentId = get(currentProjId);
    if (currentId && currentId !== "create" && currentId !== "undefined") {
      const response = await projectApi.getProject(currentId);
      if (response.status === "success" && response.body?.project) {
        return response.body.project;
      }
    }
    return null;
  },
});

function getCheckedCategoriesIds(categories: ICategoryProps[]): string[] {
  const checkedIds: string[] = [];

  for (const category of categories) {
    if (category.isChecked) {
      checkedIds.push(category.id);
    }

    if (category.childCategories) {
      const childIds = getCheckedCategoriesIds(category.childCategories);
      checkedIds.push(...childIds);
    }
  }

  return checkedIds;
}
