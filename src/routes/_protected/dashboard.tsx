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
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl shadow-black/30">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          {user ? "Authenticated" : "Guest mode"}
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-white">
          Welcome{user ? `, ${user.username}` : ", explorer"}
        </h1>
        <p className="mt-2 text-slate-400">
          {user
            ? `You are signed in as ${user.role}. Use the shortcuts below to jump into the areas you care about most.`
            : "Sign in to unlock product management and advanced dashboard insights."}
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <span className="rounded-full border border-slate-700 px-4 py-1 text-sm text-slate-300">
            Role: {user?.role ?? "guest"}
          </span>
          <span className="rounded-full border border-slate-700 px-4 py-1 text-sm text-slate-300">
            Permissions: {user?.permissions?.length ?? 0}
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-800 bg-gradient-to-br from-indigo-600/30 to-slate-900/80 p-6 text-white">
          <h2 className="text-lg font-semibold">Quick actions</h2>
          <p className="mt-1 text-sm text-slate-200">
            Navigate to commonly used sections with one click.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={() => navigate({ to: "/dashboard" })}
              className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate({ to: "/products" })}
              className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Products
            </button>
            {!user && (
              <button
                onClick={() => navigate({ to: "/login" })}
                className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Login
              </button>
            )}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-slate-200">
          <h2 className="text-lg font-semibold text-white">Session overview</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center justify-between rounded-xl border border-slate-800 px-4 py-3">
              <span>Status</span>
              <span className="font-semibold text-emerald-400">
                {user ? "Active" : "Guest"}
              </span>
            </li>
            <li className="flex items-center justify-between rounded-xl border border-slate-800 px-4 py-3">
              <span>Role</span>
              <span className="font-semibold text-white">
                {user?.role ?? "guest"}
              </span>
            </li>
            <li className="flex items-center justify-between rounded-xl border border-slate-800 px-4 py-3">
              <span>Permissions</span>
              <span className="font-semibold text-white">
                {user?.permissions?.join(", ") || "limited"}
              </span>
            </li>
          </ul>
        </article>
      </div>
    </section>
  );
}
