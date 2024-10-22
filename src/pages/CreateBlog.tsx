import { useState } from 'react';

const BlogUpload = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    const blogData = {
      title,
      image,
      description,
    };

    try {
      const response = await fetch('http://localhost:5000/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      if (response.ok) {
        setMessage('Blog uploaded successfully!');
        // Reset form
        setTitle('');
        setImage('');
        setDescription('');
      } else {
        setMessage('Failed to upload the blog.');
      }
    } catch (error) {
      console.error('Error uploading blog:', error);
      setMessage('Error uploading blog.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Upload New Blog</h1>
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
          <label className="block text-lg">Image URL:</label>
          <input 
            type="text" 
            value={image} 
            onChange={(e) => setImage(e.target.value)} 
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
            // rows="4" 
            required 
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Upload Blog
        </button>
      </form>
      {message && <p className="mt-4 text-lg">{message}</p>}
    </div>
  );
};

export default BlogUpload;
