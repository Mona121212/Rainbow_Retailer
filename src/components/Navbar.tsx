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
    <header className="border-b border-slate-700 bg-slate-950">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-white font-semibold transition hover:text-slate-300"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-cyan-400 text-xs font-bold text-white">
            RR
          </span>
          <span className="hidden sm:inline">Rainbow Retailer</span>
        </Link>

        {/* Right Navigation */}
        {user ? (
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="hidden text-sm text-slate-400 transition hover:text-white sm:inline"
            >
              Dashboard
            </Link>
            <Link
              to="/products"
              className="hidden text-sm text-slate-400 transition hover:text-white sm:inline"
            >
              Products
            </Link>
            <span className="hidden rounded-lg border border-slate-600 bg-slate-900 px-3 py-1 text-xs text-slate-300 sm:inline">
              {user.username}
            </span>
            <button
              onClick={handleLogout}
              className="rounded-lg bg-rose-600 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-rose-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            {isLoginPage ? (
              <Link
                to="/dashboard"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                Back
              </Link>
            ) : (
              <Link
                to="/login"
                className="rounded-lg bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-1.5 text-sm font-semibold text-white transition hover:shadow-lg hover:shadow-sky-500/30"
              >
                Sign in
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
