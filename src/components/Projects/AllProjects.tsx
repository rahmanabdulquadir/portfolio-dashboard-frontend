import { useEffect, useState } from "react";

const AllProjects = () => {
  const [projects, setProjects] = useState([]);


  const fetchBlogs = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/projects");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  return(
    <div id="projects" className="space-x-y">
    <div>
      <h2
       
        className="lg:text-5xl text-2xl lg:text-start text-center pt-10 text-[#48dd70] font-bold mb-12"
      >
        / projects
      </h2>

      <div
        
        className="grid grid-cols-1 place-items-center lg:grid-cols-3 gap-10 justify-center items-center mt-10"
      >
        {projects?.data?.map((project) => (
          <div
            key={project.id}
            className="project-card group w-80 h-96 bg-gray-300 shadow-lg rounded-lg overflow-hidden relative transform transition-transform duration-500 hover:scale-105"
          >
            <img
              src="https://via.placeholder.com/320x180"
              alt="Project Image"
              className="w-full h-40 object-cover"
            />
            {/* Card Content */}
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
              <p className="text-gray-600 mb-4 h-20">
                {project.description}
              </p>
              <div className="flex justify-between">
                {/* <Button href={project.liveLink} target="_blank">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    className="text-white-500 hover:text-blue-600 font-semibold transition-colors duration-300"
                  >
                    Live link
                  </a>
                </Button> */}
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
};

export default AllProjects;
