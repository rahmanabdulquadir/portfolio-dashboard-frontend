import AllProjects from "@/components/Projects/AllProjects"
import CreateProject from "@/components/Projects/CreateProject"


const Projects = () => {
  return (
    <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-5">
      <AllProjects/>
      <CreateProject/>
    </div>
  )
}

export default Projects