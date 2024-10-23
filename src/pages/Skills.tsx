import { useEffect, useState } from "react";
import AddSkillForm from "./AddSkillForm";
import SkillCard from "./SkillCard";
import { toast } from "sonner";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  console.log(skills);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/skills");
      const data = await response.json();
      setSkills(data);
      toast.success("New Skill Added to Portfolio")
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div>
      <AddSkillForm />

      <div>
        <section className="py-16 ">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              My Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {skills?.data?.map(
                (skill: { name: string; estimate: number }) => (
                  <SkillCard
                    key={skill.name}
                    name={skill.name}
                    estimate={skill.estimate}
                  />
                )
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Skills;