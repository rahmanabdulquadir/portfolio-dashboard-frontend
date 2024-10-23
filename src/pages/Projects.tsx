import AllProjects from "@/components/Projects/AllProjects";
import CreateProject from "@/components/Projects/CreateProject";
import UpdateProject from "./UpdateProject";

const Projects = () => {
  return (
    <div className="w-full">
      <div className="flex justify-center gap-5">
        <CreateProject />
        {/* <UpdateProject /> */}
      </div>
      <AllProjects />
    </div>
  );
};

export default Projects;
