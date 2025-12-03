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
  const [error, setError] = useState<string>("");
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      setError("Please enter username and password");
      return;
    }

    setIsLoading(true);
    const user = await login(trimmedUsername, trimmedPassword);
    setIsLoading(false);

    if (user) {
      authLogin(user);
      navigate({ to: "/dashboard" });
    } else {
      setError("Invalid credentials");
      setPassword("");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-cyan-400">
            <span className="text-lg font-bold text-white">RR</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold text-white">
            Rainbow Retailer
          </h1>
        </div>

        {/* Demo Credentials */}
        <div className="space-y-2 rounded-xl border border-slate-700 bg-slate-900/50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Demo accounts
          </p>
          <div className="space-y-1 text-sm text-slate-300">
            <p>
              <span className="text-slate-500">admin:</span> admin / 123456
            </p>
            <p>
              <span className="text-slate-500">manager:</span> manager / 123456
            </p>
            <p>
              <span className="text-slate-500">user:</span> user / 123456
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder=" "
              disabled={isLoading}
              className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 disabled:opacity-50"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              disabled={isLoading}
              className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 disabled:opacity-50"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-sm text-rose-300">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-gradient-to-r from-sky-500 to-cyan-400 py-2.5 font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:shadow-lg hover:shadow-sky-500/50 disabled:opacity-50 disabled:shadow-none"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
