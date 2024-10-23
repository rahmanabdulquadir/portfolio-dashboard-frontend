import { Project } from "@/components/Projects/AllProjects";
import { useEffect, useState } from "react";
import { Blog } from "./Blogs";
import { SkillApiResponse } from "./Skills";
import SkillCard from "./SkillCard";

const Home = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [skills, setSkills] = useState<SkillApiResponse | null>(null);

  const fetchProjects = async () => {
    try {
      const response = await fetch(
        "https://portfolio-dashboard-server-kappa.vercel.app/api/v1/projects"
      );
      const data = await response.json();
      setProjects(data.data); // Assuming the response has a `data` property
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects(); // Fetch projects on component mount
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(
        "https://portfolio-dashboard-server-kappa.vercel.app/api/v1/blogs"
      );
      const result = await response.json();
      if (result.success) {
        // Extract the 'data' array from the response
        setBlogs(result.data);
        console.log(result.data);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchSkills = async (): Promise<void> => {
    try {
      const response = await fetch(
        "https://portfolio-dashboard-server-kappa.vercel.app/api/v1/skills"
      );
      const data: SkillApiResponse = await response.json();
      setSkills(data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div className="lg:pr-10">
      <div className="">
        <h1 className="text-3xl font-bold text-center pt-10 underline">
          Projects
        </h1>

        <div className="grid grid-cols-1 place-items-center mx-auto lg:grid-cols-3 gap-10 justify-center items-center mt-10">
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
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-bold text-center pt-10 underline">
          Blogs
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 lg:px-0 pt-10">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Blog Image */}
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                {/* Blog Content */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{blog.description}</p>
                  {/* Optional read more link */}
                  <a
                    href={`/blogs/${blog._id}`}
                    className="text-blue-500 hover:text-blue-600 font-semibold"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No blogs available.</p>
          )}
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-bold text-center pt-10 underline">
          Skills
        </h1>
        <div>
          <section className="py-16">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                My Skills
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {skills?.data?.map((skill) => (
                  <SkillCard
                    key={skill.name}
                    name={skill.name}
                    estimate={skill.estimate}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
