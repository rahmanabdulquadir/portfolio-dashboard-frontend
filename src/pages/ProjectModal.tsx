import React, { useEffect, useState } from "react";

interface ProjectModalProps {
  projectId: string | undefined;
  isOpen: boolean;
  onClose: () => void;
  initialData: {
    title: string;
    description: string;
    techStack: string[];
    repoLinkClient: string;
    repoLinkServer: string;
    liveLink: string;
  };
  onUpdate: (updatedProject: {
    _id: string | undefined;
    title: string;
    description: string;
    techStack: string[];
    repoLinkClient: string;
    repoLinkServer: string;
    liveLink: string;
  }) => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  projectId,
  isOpen,
  onClose,
  initialData,
  onUpdate,
}) => {
  const [title, setTitle] = useState(initialData.title);
  const [description, setDescription] = useState(initialData.description);
  const [techStack, setTechStack] = useState<string[]>(initialData.techStack);
  const [repoLinkClient, setRepoLinkClient] = useState(initialData.repoLinkClient);
  const [repoLinkServer, setRepoLinkServer] = useState(initialData.repoLinkServer);
  const [liveLink, setLiveLink] = useState(initialData.liveLink);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedProject = {
      _id: projectId,
      title,
      description,
      techStack,
      repoLinkClient,
      repoLinkServer,
      liveLink,
    };

    await onUpdate(updatedProject); // Pass updated project to the handler
  };

  // Reset form fields when modal opens
  useEffect(() => {
    if (isOpen) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setTechStack(initialData.techStack);
      setRepoLinkClient(initialData.repoLinkClient);
      setRepoLinkServer(initialData.repoLinkServer);
      setLiveLink(initialData.liveLink);
    }
  }, [isOpen, initialData]);

  return (
    isOpen && (
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Tech Stack:</label>
            <input
              type="text"
              value={techStack.join(", ")}
              onChange={(e) => setTechStack(e.target.value.split(", ").map((item) => item.trim()))}
              required
            />
          </div>
          <div>
            <label>Client Repo Link:</label>
            <input
              type="url"
              value={repoLinkClient}
              onChange={(e) => setRepoLinkClient(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Server Repo Link:</label>
            <input
              type="url"
              value={repoLinkServer}
              onChange={(e) => setRepoLinkServer(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Live Link:</label>
            <input
              type="url"
              value={liveLink}
              onChange={(e) => setLiveLink(e.target.value)}
            />
          </div>
          <button type="submit">Update Project</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    )
  );
};

export default ProjectModal;
