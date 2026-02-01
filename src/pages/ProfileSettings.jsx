import { useAuth } from "../auth/AuthContext";

export default function ProfileSettings() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto p-8 text-white">
      <h1 className="text-2xl font-bold mb-2">Profile Settings</h1>
      <p className="text-slate-400 mb-8">
        Manage your personal information
      </p>

      <div className="bg-[#161b2c] border border-white/5 rounded-2xl p-6 space-y-6">
        <div>
          <label className="text-xs uppercase text-slate-500">
            Full Name
          </label>
          <input
            value={user.name}
            disabled
            className="w-full mt-2 bg-black/30 p-3 rounded-xl border border-white/10"
          />
        </div>

        <div>
          <label className="text-xs uppercase text-slate-500">
            Role
          </label>
          <input
            value={user.role}
            disabled
            className="w-full mt-2 bg-black/30 p-3 rounded-xl border border-white/10"
          />
        </div>

        <div>
          <label className="text-xs uppercase text-slate-500">
            Employee ID
          </label>
          <input
            value={user.id}
            disabled
            className="w-full mt-2 bg-black/30 p-3 rounded-xl border border-white/10"
          />
        </div>

        <p className="text-xs text-slate-500 italic">
          Profile updates are managed by HR.
        </p>
      </div>
    </div>
  );
}
