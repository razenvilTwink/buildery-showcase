
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { projectsData, Project } from '@/data/projects';

interface ProjectsState {
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: number, project: Omit<Project, 'id'>) => void;
  deleteProject: (id: number) => void;
  resetToDefaults: () => void;
}

export const useProjectsStore = create<ProjectsState>()(
  persist(
    (set, get) => ({
      projects: projectsData,

      addProject: (project) => set((state) => {
        const newId = Math.max(0, ...state.projects.map(p => p.id)) + 1;
        return {
          projects: [...state.projects, { id: newId, ...project }]
        };
      }),

      updateProject: (id, updatedProject) => set((state) => ({
        projects: state.projects.map(project => 
          project.id === id 
            ? { ...project, ...updatedProject } 
            : project
        )
      })),

      deleteProject: (id) => set((state) => ({
        projects: state.projects.filter(project => project.id !== id)
      })),

      resetToDefaults: () => set(() => ({ projects: projectsData })),
    }),
    {
      name: 'projects-storage',
      version: 2,
      partialize: (state) => ({ projects: state.projects }),
      migrate: (persistedState: unknown, version) => {
        // Сбросить сохранённые проекты при повышении версии или если данных нет/они некорректны
        const persistedProjects = (persistedState as { projects?: Project[] } | undefined)?.projects;
        if (version < 2 || !Array.isArray(persistedProjects)) {
          return { projects: projectsData } as unknown as ProjectsState;
        }
        // Вернуть только проекты; функции остаются из инициализации стора
        return { projects: persistedProjects } as unknown as ProjectsState;
      },
    }
  )
);
