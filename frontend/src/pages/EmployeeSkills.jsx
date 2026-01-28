import { useEffect, useState } from "react";
import { fetchMySkills, saveMySkills } from "../api/skill.api";

export default function EmployeeSkills() {
  const [skills, setSkills] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const data = await fetchMySkills();
      setSkills(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addSkill = async () => {
    if (!input.trim()) return;
    const updated = [...skills, input.trim()];
    await saveMySkills({ skills: updated });
    setSkills(updated);
    setInput("");
  };

  if (loading) {
    return <p className="p-6 text-slate-500">Loading skills...</p>;
  }

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="bg-white rounded-xl shadow p-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800">
             My Skills
          </h2>
          <p className="text-slate-500 mt-1">
            Showcase your technical expertise
          </p>
        </div>
        <span className="px-4 py-1 rounded-full bg-emerald-100 text-emerald-700 font-medium">
          {skills.length} Skills
        </span>
      </div>

      {/* Add Skill */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex gap-3 max-w-md">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a skill (e.g. React, Python)"
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            onClick={addSkill}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg"
          >
            Add
          </button>
        </div>
      </div>

      {/* Skills List */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Your Skills</h3>

        {skills.length === 0 ? (
          <p className="text-slate-500">
            No skills added yet 
          </p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="group flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-slate-700 font-medium hover:bg-red-100 transition"
              >
                <span>{skill}</span>

                {/* Delete button */}
                <button
                  onClick={async () => {
                    const updated = skills.filter((_, i) => i !== index);
                    await saveMySkills({ skills: updated });
                    setSkills(updated);
                  }}
                  className="hidden group-hover:block text-red-500 hover:text-red-700 text-sm font-bold"
                  title="Remove skill"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
  );
}
