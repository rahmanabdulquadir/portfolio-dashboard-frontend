import React, { useEffect, useState } from "react";

interface ProjectModalProps {
  projectId: string; // Assuming projectId will always be defined when modal is open
  isOpen: boolean;
  onClose: () => void;
  initialData: {
    title: string;
    description: string;
    techStack: string[];
    repoLinkClient: string;
    repoLinkServer: string;
    liveLink?: string; // Making this optional
  };
  onUpdate: (updatedProject: {
    _id: string;
    title: string;
    description: string;
    techStack: string[];
    repoLinkClient: string;
    repoLinkServer: string;
    liveLink?: string; // Making this optional as well
  }) => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  projectId,
  isOpen,
  onClose,
  initialData,
  onUpdate,
}) => {
  const [title, setTitle] = useState<string>(initialData.title);
  const [description, setDescription] = useState<string>(initialData.description);
  const [techStack, setTechStack] = useState<string[]>(initialData.techStack);
  const [repoLinkClient, setRepoLinkClient] = useState<string>(initialData.repoLinkClient);
  const [repoLinkServer, setRepoLinkServer] = useState<string>(initialData.repoLinkServer);
  const [liveLink, setLiveLink] = useState<string | undefined>(initialData.liveLink);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedProject = {
      _id: projectId,
      title,
      description,
      techStack,
      repoLinkClient,
      repoLinkServer,
      liveLink, // This can now be undefined if not provided
    };

    await onUpdate(updatedProject); // Pass updated project to the handler
    onClose(); // Close the modal after submission
  };

  // Reset form fields when modal opens
  useEffect(() => {
    if (isOpen) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setTechStack(initialData.techStack);
      setRepoLinkClient(initialData.repoLinkClient);
      setRepoLinkServer(initialData.repoLinkServer);
      setLiveLink(initialData.liveLink); // Should work correctly
    }
  }, [isOpen, initialData]);

  return (
    isOpen && (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h2 className="modal-title">Edit Project</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Tech Stack:</label>
              <input
                type="text"
                value={techStack.join(", ")}
                onChange={(e) => setTechStack(e.target.value.split(", ").map((item) => item.trim()))}
                required
              />
            </div>
            <div className="form-group">
              <label>Client Repo Link:</label>
              <input
                type="url"
                value={repoLinkClient}
                onChange={(e) => setRepoLinkClient(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Server Repo Link:</label>
              <input
                type="url"
                value={repoLinkServer}
                onChange={(e) => setRepoLinkServer(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Live Link:</label>
              <input
                type="url"
                value={liveLink || ""} // Default to empty string if undefined
                onChange={(e) => setLiveLink(e.target.value || undefined)} // Set as undefined if empty
              />
            </div>
            <button type="submit" className="submit-button">Update Project</button>
          </form>
          <button onClick={onClose} className="close-button">Close</button>
        </div>
      </div>
    )
  );
};

export default ProjectModal;
