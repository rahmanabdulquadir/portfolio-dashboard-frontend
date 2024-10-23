/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's CSS for styling

const BlogUpload = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState(""); // This will store the rich text content
  const [message, setMessage] = useState("");
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(
        "https://portfolio-dashboard-server-kappa.vercel.app/api/v1/blogs"
      );
      const data = await response.json();
      setBlogs(data); // Store fetched blogs in state
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs(); // Fetch blogs on component mount
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const blogData = {
      title,
      image,
      description, // Send the rich text content
    };

    try {
      const response = await fetch(
        "https://portfolio-dashboard-server-kappa.vercel.app/api/v1/blogs/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(blogData),
        }
      );

      if (response.ok) {
        // Reset form fields
        setTitle("");
        setImage("");
        setDescription(""); // Reset rich text content
        toast.success("Blog uploaded to the portfolio.");

        // Refetch blogs to update the list without refreshing the page
        fetchBlogs();
      } else {
        setMessage("Failed to upload the blog.");
      }
    } catch (error) {
      console.error("Error uploading blog:", error);
      setMessage("Error uploading blog.");
    }
  };

  const refreshPage = () => {
    window.location.reload(); // This will reload the entire page
  };
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Post a New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Blog Title"
            required
          />
        </div>
        <div>
          <label className="block text-lg">Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-3 border rounded"
            placeholder="Please provide an image URL"
          />
        </div>
        <div>
          <label className="block text-lg">Description:</label>
          {/* Replace textarea with ReactQuill for rich text editing */}
          <ReactQuill
            value={description}
            onChange={setDescription}
            className="w-full p-2 border rounded"
            placeholder="Blog Description"
            // required
          />
        </div>
        <button
          type="submit"
          onClick={refreshPage}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Upload Blog
        </button>
      </form>
      {message && <p className="mt-4 text-lg">{message}</p>}
    </div>
  );
};

export default BlogUpload;
