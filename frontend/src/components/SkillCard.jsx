export default function SkillCard({ skill, onUpdate, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
      <div>
        <h3 className="font-semibold text-slate-800">{skill.name}</h3>
        <p className="text-sm text-slate-500">
          Level: {skill.level} / 5
        </p>
      </div>

      <div className="flex gap-2">
        <input
          type="range"
          min="1"
          max="5"
          value={skill.level}
          onChange={(e) =>
            onUpdate(skill._id, { level: Number(e.target.value) })
          }
        />
        <button
          onClick={() => onDelete(skill._id)}
          className="text-red-500 text-sm"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
