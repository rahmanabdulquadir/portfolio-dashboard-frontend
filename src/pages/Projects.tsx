import AllProjects from "@/components/Projects/AllProjects";
import CreateProject from "@/components/Projects/CreateProject";

const Projects = () => {
  return (
    <div className="w-full">
      <div>
        <CreateProject />
      </div>
      <AllProjects />
    </div>
  );
};

export default Projects;
