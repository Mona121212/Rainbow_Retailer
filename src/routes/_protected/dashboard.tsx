import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../context/AuthContext";
import ProtectedRoutes from "../../components/ProtectedRoutes";

export const Route = createFileRoute("/_protected/dashboard")({
  component: () => (
    <ProtectedRoutes allowGuest>
      <RouteComponent />
    </ProtectedRoutes>
  ),
});

function RouteComponent() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <section className="space-y-8">
      {/* 欢迎卡片 */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/90 to-slate-950/60 p-8 shadow-xl shadow-black/30">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white">
            Welcome{user ? `, ${user.username}` : " back"}
          </h1>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm text-slate-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              {user ? `${user.role}` : "Guest"}
            </span>
            {user && (
              <span className="rounded-full border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm text-slate-300">
                {user.permissions?.length ?? 0} permissions
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Quick access
          </h2>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => navigate({ to: "/dashboard" })}
              className="rounded-xl bg-slate-800 px-4 py-3 text-left text-sm font-medium text-slate-100 transition hover:bg-slate-700"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate({ to: "/products" })}
              className="rounded-xl bg-slate-800 px-4 py-3 text-left text-sm font-medium text-slate-100 transition hover:bg-slate-700"
            >
              Products
            </button>
            {!user && (
              <button
                onClick={() => navigate({ to: "/login" })}
                className="rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-3 text-left text-sm font-semibold text-white transition hover:opacity-90"
              >
                Sign in
              </button>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Session</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between rounded-lg border border-slate-800 px-4 py-3 text-sm">
              <span className="text-slate-400">Status</span>
              <span className="font-medium text-emerald-400">
                {user ? "Active" : "Guest"}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-slate-800 px-4 py-3 text-sm">
              <span className="text-slate-400">Role</span>
              <span className="font-medium text-white">
                {user?.role ?? "—"}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-slate-800 px-4 py-3 text-sm">
              <span className="text-slate-400">Permissions</span>
              <span className="font-medium text-white">
                {user?.permissions?.length ?? 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
