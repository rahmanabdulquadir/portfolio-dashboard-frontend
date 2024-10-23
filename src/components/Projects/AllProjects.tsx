/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import ProjectModal from "@/pages/ProjectModal";
import axios from "axios";

// Define the types for your project data
interface Project {
  _id: string; // _id should be a string
  title: string;
  description: string;
  techStack: string[];
  repoLinkClient: string;
  repoLinkServer: string;
  liveLink?: string; // Optional property for live link
  image?: string; // Optional property for image URL
}

const AllProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null); // Track the current project to edit

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/projects");
      const data = await response.json();
      setProjects(data.data); // Assuming the response has a `data` property
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects(); // Fetch projects on component mount
  }, []);

  const handleOpenModal = (project: Project) => {
    setCurrentProject(project); // Set the current project to edit
    setModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Close the modal
    setCurrentProject(null); // Reset the current project
  };

  const handleUpdate = async (updatedProject: Project) => {
    try {
      // Update the project in the backend using PATCH
      await axios.patch(
        `http://localhost:5000/api/v1/projects/update/${updatedProject._id}`,
        updatedProject
      );

      // Refetch the projects to update the list
      fetchProjects();
      handleCloseModal(); // Close the modal after successful update
    } catch (error: any) {
      console.error(
        "Error updating project:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div id="projects" className="space-y-4">
      <h2 className="lg:text-5xl text-2xl lg:text-start text-center pt-10 text-[#48dd70] font-bold mb-12">
        / projects
      </h2>

      <div className="grid grid-cols-1 place-items-center lg:grid-cols-3 gap-10 justify-center items-center mt-10">
        {projects.map((project) => (
          <div
            key={project._id}
            className="project-card group w-80 h-96 bg-gray-300 shadow-lg rounded-lg overflow-hidden relative transform transition-transform duration-500 hover:scale-105"
          >
            <img
              src={project.image || "https://via.placeholder.com/320x180"} // Use project image or placeholder
              alt="Project Image"
              className="w-full h-40 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
              <p className="text-gray-600 mb-4 h-20">{project.description}</p>
              <div className="flex justify-between">
                <Button onClick={() => handleOpenModal(project)}>Edit</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal to update project */}
      {isModalOpen && currentProject && (
        <ProjectModal
          projectId={currentProject._id} // Current project ID
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          initialData={{
            title: currentProject.title,
            description: currentProject.description,
            techStack: currentProject.techStack,
            repoLinkClient: currentProject.repoLinkClient,
            repoLinkServer: currentProject.repoLinkServer,
            liveLink: currentProject.liveLink || "", // Provide default value if undefined
          }}
          onUpdate={handleUpdate} // Callback to refresh the project list
        />
      )}
    </div>
  );
};

export default AllProjects;
