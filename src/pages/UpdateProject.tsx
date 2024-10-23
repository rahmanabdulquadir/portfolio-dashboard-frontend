import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProject = () => {
  const { id } = useParams(); // Get the project ID from the route params
  const navigate = useNavigate();

  // State for form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [techStack, setTechStack] = useState([]);
  const [repoLinkClient, setRepoLinkClient] = useState('');
  const [repoLinkServer, setRepoLinkServer] = useState('');
  const [liveLink, setLiveLink] = useState('');
  const [message, setMessage] = useState('');

  // Fetch the current project data when the component mounts
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/projects/${id}`);
        const project = response.data.data;
        setTitle(project.title);
        setDescription(project.description);
        setTechStack(project.techStack);
        setRepoLinkClient(project.repoLinkClient);
        setRepoLinkServer(project.repoLinkServer);
        setLiveLink(project.liveLink || ''); // Optional field
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };
    fetchProject();
  }, [id]);

  // Handle form submission to update the project
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProject = {
      title,
      description,
      techStack,
      repoLinkClient,
      repoLinkServer,
      liveLink,
    };

    try {
      const response = await axios.put(`http://localhost:5000/api/v1/projects/update/${id}`, updatedProject);
      if (response.status === 200) {
        setMessage('Project updated successfully.');
        navigate('/projects'); // Redirect to project list page after successful update
      }
    } catch (error) {
      console.error('Error updating project:', error);
      setMessage('Failed to update project.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Update Project</h1>
      {message && <p className="mt-4 text-lg">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-lg">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-lg">Tech Stack (comma separated):</label>
          <input
            type="text"
            value={techStack.join(', ')}
            onChange={(e) => setTechStack(e.target.value.split(',').map((item) => item.trim()))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-lg">Client Repo Link:</label>
          <input
            type="text"
            value={repoLinkClient}
            onChange={(e) => setRepoLinkClient(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-lg">Server Repo Link:</label>
          <input
            type="text"
            value={repoLinkServer}
            onChange={(e) => setRepoLinkServer(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-lg">Live Link (optional):</label>
          <input
            type="text"
            value={liveLink}
            onChange={(e) => setLiveLink(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update Project
        </button>
      </form>
    </div>
  );
};

export default UpdateProject;
