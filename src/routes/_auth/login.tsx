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
  const [isLoading, setIsLoading] = useState(false);
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

    setIsLoading(true);
    const user = await login(trimmedUsername, trimmedPassword);
    setIsLoading(false);

    if (user) {
      authLogin(user);
      navigate({ to: "/dashboard" });
    } else {
      alert("Invalid credentials");
      setPassword("");
    }
  };

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-black px-6 py-10 text-white shadow-2xl md:flex-row md:gap-16">
      {/* 左侧 - 品牌和说明 */}
      <div className="flex-1 space-y-6 md:pr-8">
        <div>
          <h1 className="text-5xl font-bold leading-tight">
            Welcome to
            <span className="block bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
              Rainbow Retailer
            </span>
          </h1>
        </div>

        <div className="grid gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Admin
            </p>
            <p className="mt-2 font-mono text-sm text-slate-200">
              admin / 123456
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Manager
            </p>
            <p className="mt-2 font-mono text-sm text-slate-200">
              manager / 123456
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              User
            </p>
            <p className="mt-2 font-mono text-sm text-slate-200">
              user / 123456
            </p>
          </div>
        </div>
      </div>

      {/* 右侧 - 登录表单 */}
      <form
        onSubmit={handleSubmit}
        className="w-full flex-1 space-y-6 rounded-2xl bg-white/5 p-8 backdrop-blur md:max-w-md"
      >
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-300">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-500 focus:border-sky-400 focus:bg-white/20 focus:outline-none transition"
            disabled={isLoading}
          />
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-300">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-500 focus:border-sky-400 focus:bg-white/20 focus:outline-none transition"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 py-3 text-center text-base font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </section>
  );
}
