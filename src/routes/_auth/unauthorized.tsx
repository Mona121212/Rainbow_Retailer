import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/unauthorized")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-10">
      <h2 className="text-4xl font-bold mb-2">Unauthorized Access</h2>
      <p className="text-gray-800">
        You do not have permission to access this page
      </p>
      <Link className="text-blue-400" to="/dashboard">
        Go back to Dashboard
      </Link>
      <br />
      <Link className="text-blue-400" to="/login">
        Go back to Login
      </Link>
    </div>
  );
}
