import { useEffect, useState } from "react";
import CreateBlog from "./CreateBlog";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export interface Blog {
  _id: string;
  title: string;
  image: string;
  description: string;
  __v: number;
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // State for loading
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    setLoading(true); // Start loading before fetching
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
    } finally {
      setLoading(false); // Stop loading after fetch is done
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="w-full">
      <div
        onClick={() => navigate(-1)}
        className="flex items-center gap-3 pb-5 cursor-pointer"
      >
        <BiArrowBack className="text-3xl" />
        <h2 className="text-black">Go Back</h2>
      </div>
      <CreateBlog />
      <span className="text-sm text-blue-300">
        NB: If the new blog does not visible, please refresh the page
      </span>

      <h2 className="text-center text-3xl font-bold py-10">/Blogs</h2>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="loader border-t-transparent border-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
          {/* Alternatively, you can display a text-based loader */}
          {/* <p>Loading blogs...</p> */}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 lg:px-0">
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
      )}
    </div>
  );
};

export default Blogs;
