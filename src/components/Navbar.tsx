import { Link, useMatchRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "../context/AuthContext";
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const matchRoute = useMatchRoute();
  const isLoginPage = matchRoute({ to: "/login" });
  const handleLogout = () => {
    logout();
    navigate({ to: "/dashboard" });
  };
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 text-sm font-medium">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-sky-400 text-white">
            RR
          </span>
          Rainbow Retailer
        </Link>
        {user ? (
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="text-slate-300 transition hover:text-white"
            >
              Dashboard
            </Link>
            <Link
              to="/products"
              className="text-slate-300 transition hover:text-white"
            >
              Products
            </Link>
            <div className="rounded-full border border-slate-700 px-4 py-1 text-slate-200">
              {user.username} · {user.role}
            </div>
            <button
              onClick={handleLogout}
              className="rounded-md bg-gradient-to-r from-rose-500 to-orange-400 px-4 py-1.5 font-semibold text-white shadow ring-1 ring-white/20 transition hover:opacity-90"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            {isLoginPage ? (
              <Link
                to="/dashboard"
                className="text-slate-300 transition hover:text-white"
              >
                Back to dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="rounded-md bg-gradient-to-r from-indigo-500 to-sky-500 px-4 py-1.5 text-white shadow"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
