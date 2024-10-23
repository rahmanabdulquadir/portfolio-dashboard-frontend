import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

const CreateProject = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    techStack: [] as string[],
    repoLinkClient: "",
    repoLinkServer: "",
    liveLink: "",
  });


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTechStackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      techStack: value.split(",").map((tech) => tech.trim()),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/projects/create",
        formData
      );
      console.log("Project created:", response.data);
      // Optionally reset form
      setFormData({
        title: "",
        image: "",
        description: "",
        techStack: [],
        repoLinkClient: "",
        repoLinkServer: "",
        liveLink: "",
      });
      toast.success("Project added to the portfolio.")
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

 

  // const refreshPage = () => {
  //   window.location.reload(); // This will reload the entire page
  // };

  return (
    <form onSubmit={handleSubmit} className=" p-4 bg-white shadow-md rounded">
      <h2 className="text-lg font-semibold mb-4">Create New Project</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Image URL</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">
          Tech Stack (comma separated)
        </label>
        <input
          type="text"
          name="techStack"
          value={formData.techStack}
          onChange={handleTechStackChange}
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">
          Client Repository Link
        </label>
        <input
          type="url"
          name="repoLinkClient"
          value={formData.repoLinkClient}
          onChange={handleChange}
          required
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">
          Server Repository Link
        </label>
        <input
          type="url"
          name="repoLinkServer"
          value={formData.repoLinkServer}
          onChange={handleChange}
          required
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Live Link</label>
        <input
          type="url"
          name="liveLink"
          value={formData.liveLink}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      <button type="submit"  className="bg-black text-white rounded px-4 py-2">
        Create Project
      </button>
      <span className="text-sm text-blue-300 ml-5">
        NB: If the new blog does not visible, please refresh the page
      </span>
    </form>
  );
};

export default CreateProject;
