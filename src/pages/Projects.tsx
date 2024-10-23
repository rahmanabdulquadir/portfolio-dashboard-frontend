import AllProjects from "@/components/Projects/AllProjects";
import CreateProject from "@/components/Projects/CreateProject";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full">
      <div
        onClick={() => navigate(-1)}
        className="flex items-center gap-3 pb-5 cursor-pointer"
      >
        <BiArrowBack className="text-3xl" />
        <h2 className="text-black">Go Back</h2>
      </div>
      <div>
        <CreateProject />
      </div>
      <AllProjects />
    </div>
  );
};

export default Projects;
