/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

const AddSkillForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    estimate: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://portfolio-dashboard-server-kappa.vercel.app/api/v1/skills/create",
        formData,
        {
          headers: {
            "Content-Type": "application/json", // Ensure this matches your backend expectations
          },
        }
      );
      toast.success("Skill added successfully");
      console.log("Skill added successfully:", response.data);
    } catch (error: any) {
      console.error(
        "Error adding skill:",
        error.response?.data || error.message
      );
    }
  };

  const refreshPage = () => {
    window.location.reload(); // This will reload the entire page
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 shadow-lg rounded-lg"
    >
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 font-semibold mb-2"
        >
          Skill Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Enter skill name"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="estimate"
          className="block text-gray-700 font-semibold mb-2"
        >
          Skill Estimate (Percentage)
        </label>
        <input
          type="number"
          id="estimate"
          name="estimate"
          value={formData.estimate}
          onChange={handleInputChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Enter skill percentage"
        />
      </div>

      <button
        type="submit"
        onClick={refreshPage}
        className="w-full bg-black text-white py-3 rounded-md hover:bg-indigo-600 transition duration-300 ease-in-out font-semibold"
      >
        Add Skill
      </button>

      <span className="text-sm text-blue-300">
        NB: If the new blog does not visible, please refresh the page
      </span>
    </form>
  );
};

export default AddSkillForm;
