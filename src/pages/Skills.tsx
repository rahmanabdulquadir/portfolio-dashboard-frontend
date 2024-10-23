import { useEffect, useState } from "react";
import AddSkillForm from "./AddSkillForm";
import SkillCard from "./SkillCard";
import { toast } from "sonner";


export interface Skill {
  name: string;
  estimate: number;
}


export interface SkillApiResponse {
  data: Skill[];
}

const Skills = () => {
  // Define the correct type for the state
  const [skills, setSkills] = useState<SkillApiResponse | null>(null); // Initially null

  console.log(skills);

  const fetchSkills = async (): Promise<void> => {
    try {
      const response = await fetch(
        "https://portfolio-dashboard-server-kappa.vercel.app/api/v1/skills"
      );
      const data: SkillApiResponse = await response.json();
      setSkills(data);
      toast.success("New Skill Added to Portfolio");
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div>
      <AddSkillForm />

      <div>
        <section className="py-16">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">My Skills</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {skills?.data?.map((skill) => (
                <SkillCard key={skill.name} name={skill.name} estimate={skill.estimate} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Skills;
