import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { login } from "../../api";
import { useAuth } from "../../context/AuthContext";

export const Route = createFileRoute("/_auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      alert("Please enter username and password");
      return;
    }

    const user = await login(trimmedUsername, trimmedPassword);
    if (user) {
      authLogin(user);
      navigate({ to: "/dashboard" });
    } else {
      alert("Invalid credentials. Please check the console (F12) for details.");
      setUsername("");
      setPassword("");
    }
  };
  return (
    <section className="flex min-h-[60vh] flex-col justify-center gap-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-black px-6 py-10 text-white shadow-2xl md:flex-row md:items-center">
      <div className="flex-1 space-y-4">
        <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
          Access Management
        </p>
        <h1 className="text-4xl font-bold leading-tight md:text-5xl">
          Sign in to manage{" "}
          <span className="text-sky-400">Rainbow Retailer</span>
        </h1>
        <p className="text-slate-300">
          Use the demo accounts from{" "}
          <code className="rounded bg-black/40 px-2">db.json</code> to explore
          how different roles unlock features across the dashboard and product
          catalog.
        </p>
        <ul className="grid gap-3 text-sm text-slate-300 md:grid-cols-2">
          <li className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Admin
            </p>
            admin / 123456
          </li>
          <li className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Manager
            </p>
            manager / 123456
          </li>
          <li className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              User
            </p>
            user / 123456
          </li>
        </ul>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex-1 space-y-6 rounded-2xl bg-white/5 p-8 backdrop-blur"
      >
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-200">
            Username
          </label>
          <input
            className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:outline-none"
            type="text"
            value={username}
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-200">
            Password
          </label>
          <input
            className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:outline-none"
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 py-3 text-center text-lg font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:scale-[1.01]"
        >
          Login
        </button>
      </form>
    </section>
  );
}
