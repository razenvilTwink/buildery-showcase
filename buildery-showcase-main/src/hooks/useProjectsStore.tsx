
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { projectsData, Project } from '@/data/projects';

interface ProjectsState {
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: number, project: Omit<Project, 'id'>) => void;
  deleteProject: (id: number) => void;
}

export const useProjectsStore = create<ProjectsState>()(
  persist(
    (set) => ({
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
    }),
    {
      name: 'projects-storage',
    }
  )
);
