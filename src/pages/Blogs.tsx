import { useEffect, useState } from "react";
import CreateBlog from "./CreateBlog";

interface Blog {
  _id: string;
  title: string;
  image: string;
  description: string;
  __v: number;
}

const Blogs = () => {
  // Define the state with the blog type
  const [blogs, setBlogs] = useState<Blog[]>([]);

  // const fetchBlogs = async () => {
  //   try {
  //     const response = await fetch("https://portfolio-dashboard-server-kappa.vercel.app/api/v1/blogs");
  //     const data = await response.json();
  //     setBlogs(data);
  //   } catch (error) {
  //     console.error("Error fetching blogs:", error);
  //   }
  // };

  // useEffect(() => {
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

  //   fetchBlogs();
  // }, []);

  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div className="w-full">
      <CreateBlog />
      <span className="text-sm text-blue-300">
        NB: If the new blog does not visible, please refresh the page
      </span>

      <h2 className="text-center text-3xl font-bold py-10">/Blogs</h2>

      <div className="text-center grid grid-cols-1 lg:grid-cols-3 gap-5">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id}>
              <h2>{blog.title}</h2>
              <img src={blog.image} alt={blog.title} />
              <p>{blog.description}</p>
            </div>
          ))
        ) : (
          <p>No blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default Blogs;
