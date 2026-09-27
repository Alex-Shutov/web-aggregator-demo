import React, { useEffect, useMemo } from "react";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from "recoil";
import {
  allProjectsList,
  currentProjId,
  getCurrentProjectAtom,
  IProjectList,
} from "@components/Project/projects.atom";
import {
  getAllProject,
  getCurrentProject,
} from "@components/Project/projects.selector";
import projectApi from "@components/Project/projects.api";
import {
  IProjectProps,
  IProjectWithFunctions,
} from "@components/Project/projects.types";
import useEvents from "@components/Home/components/EventsFilter/hooks/useEvents";
import useTeam from "@components/Teams/hooks/useTeam";
import { handleSubmit } from "@utils/snackbar";
import {
  imagesFileState,
  mainImageFileState,
  videoFileState,
  zipFileState,
} from "@components/Project/projects.create.atom";
import useUser from "@components/User/hooks/useUser";
import { isDemoUser } from "@utils/isDemoUser";

function useProjects(id: string | undefined): IProjectWithFunctions;
function useProjects(): IProjectList;

function useProjects(id?: string): IProjectWithFunctions | IProjectList {
  const { team } = useTeam();
  const { currentEvent } = useEvents();
  const { user } = useUser();
  const [project, setProject] = useRecoilState(getCurrentProjectAtom);
  const [allProjects, setAllProjects] = useRecoilState(allProjectsList);
  const [currentId, setCurrentId] = useRecoilState(currentProjId);
  const [zipFile, setZipFile] = useRecoilState(zipFileState);
  const [images, setImages] = useRecoilState(imagesFileState);
  const [mainImage, setMainImage] = useRecoilState(mainImageFileState);
  const [video, setVideo] = useRecoilState(videoFileState);
  const resetCurrent = useResetRecoilState(currentProjId);

  const getAllProjects = useRecoilValue(getAllProject);
  const getCurrentProj = useRecoilValue(getCurrentProject);
  setAllProjects(getAllProjects);

  useEffect(() => {
    return () => {
      resetCurrent();
    };
  }, []);

  const initializeProject = async () => {
    if (isDemoUser(user)) {
      handleSubmit("Создание проекта недоступно в демо-режиме");
      return;
    }
    if (currentEvent && team) {
      return await projectApi
        .createProject(currentEvent.id, team?.id)
        .then((resp) => {
          if (resp.status === "success") {
            setProject(resp.body.project);
            setCurrentId(resp.body.project.id);
            return resp.body.project;
          }
          return resp.body;
        });
    }
  };

  const uploadPendingFiles = async (projectId: string) => {
    if (!zipFile && !mainImage && !video && !images.length) return;
    const resp = await projectApi.uploadProjectFiles(projectId, {
      zip: zipFile,
      images,
      mainImage,
      video,
    });
    if (resp.status === "success") {
      setZipFile(null);
      setImages([]);
      setMainImage(null);
      setVideo(null);
    }
  };

  const updateProject = async () => {
    if (isDemoUser(user)) {
      handleSubmit("Сохранение недоступно в демо-режиме");
      return;
    }
    if (!project) return;
    const resp = await projectApi.updateProject(project);
    if (resp.status === "success") {
      setProject(resp.body.project);
      await uploadPendingFiles(resp.body.project.id);
      handleSubmit("Проект сохранен");
    }
  };

  const publicProject = async () => {
    if (isDemoUser(user)) {
      handleSubmit("Публикация недоступна в демо-режиме");
      return;
    }
    if (!project) return;
    await uploadPendingFiles(project.id);
    const resp = await projectApi.publicProj(project);
    if (resp.status === "success") {
      setProject(resp.body.project);
      handleSubmit("Проект опубликован");
    }
  };

  const updateProjectState = (updatedProject: IProjectProps) => {
    setProject(updatedProject);
  };

  const result = useMemo(() => {
    if (id && id !== "create") {
      if (id && project)
        return {
          ...project,
          updateProjectState,
          initializeProject,
          updateProject,
          publicProject,
        } as IProjectWithFunctions;
      if (allProjects?.projects?.length) {
        const findedProj = allProjects?.projects.find((el) => el.id === id);
        if (!findedProj) {
          setCurrentId(id);

          return {
            ...project,
            updateProjectState,
            initializeProject,
            updateProject,
            publicProject,
          } as IProjectWithFunctions;
        } else {
          return {
            ...findedProj,
            updateProjectState,
            initializeProject,
            updateProject,
            publicProject,
          } as IProjectWithFunctions;
        }
      } else {
        setCurrentId(id);
        setProject(getCurrentProj);
        return {
          ...project,
          updateProject: updateProjectState,
          initializeProject,
        } as IProjectWithFunctions;
      }
    } else {
      return {
        projects: allProjects?.projects,
        page: allProjects?.page,
        totalCount: allProjects?.totalCount,
      };
    }
  }, [
    allProjects?.page,
    allProjects?.projects,
    allProjects?.totalCount,
    getCurrentProj,
    id,
    initializeProject,
    project,
    setCurrentId,
    setProject,
    updateProjectState,
  ]);

  return { ...result };
}

export default useProjects;
