import { createFileRoute, useNavigate } from "@tanstack/react-router";
import ProtectedRoutes from "../../components/ProtectedRoutes";
import { PERMISSIONS } from "../../utils/roles";
import { deleteProducts, getProducts } from "../../api";
import { useAuth } from "../../context/AuthContext";

type Product = {
  id: string;
  name: string;
  price: number;
};

export const Route = createFileRoute("/_protected/products")({
  component: () => (
    <ProtectedRoutes permission={[PERMISSIONS.VIEW_PRODUCTS]}>
      <RouteComponent />
    </ProtectedRoutes>
  ),
  loader: async () => {
    const products = await getProducts();
    return products;
  },
});

function RouteComponent() {
  const products = Route.useLoaderData() as Product[];
  const { user, hasPermission } = useAuth();
  const navigate = useNavigate();
  const canEdit = hasPermission(PERMISSIONS.EDIT_PRODUCT);
  const canDelete = hasPermission(PERMISSIONS.DELETE_PRODUCT);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (!canDelete) {
      navigate({ to: "/unauthorized" });
      return;
    }

    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProducts(id);
      window.location.reload();
    }
  };

  return (
    <section className="space-y-8">
      <header className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/90 to-slate-950/60 p-8 text-white shadow-xl shadow-black/30">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Inventory
            </p>
            <h1 className="mt-2 text-4xl font-semibold">Product catalog</h1>
            <p className="mt-2 max-w-2xl text-slate-300">
              Review all stocked items and perform quick actions based on your
              role permissions.
            </p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-right">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Total items
            </p>
            <p className="text-3xl font-bold">{products?.length ?? 0}</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-300">
          <span className="rounded-full border border-white/20 px-4 py-1">
            Signed in as {user?.username}
          </span>
          {canEdit && (
            <span className="rounded-full border border-emerald-400/30 px-4 py-1 text-emerald-300">
              Edit access
            </span>
          )}
          {canDelete && (
            <span className="rounded-full border border-rose-400/30 px-4 py-1 text-rose-300">
              Delete access
            </span>
          )}
        </div>
      </header>

      {(!products || products.length === 0) && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-center text-slate-300">
          No products available.{" "}
          {canEdit
            ? "Add items via the API to get started."
            : "Reach out to an admin for access."}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products?.map((product: Product) => (
          <article
            key={product.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-slate-100 shadow-lg shadow-black/20"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  #{product.id}
                </p>
                <h3 className="mt-1 text-xl font-semibold">{product.name}</h3>
              </div>
              <p className="text-2xl font-bold text-emerald-400">
                ${product.price}
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {canEdit && (
                <button
                  type="button"
                  onClick={() => alert(`Edit: ${product.name}`)}
                  className="rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Edit
                </button>
              )}
              {canDelete && (
                <button
                  type="button"
                  onClick={(e) => handleDelete(product.id, e)}
                  className="rounded-xl border border-rose-500/40 px-4 py-2 text-sm font-semibold text-rose-300 transition hover:bg-rose-500/10"
                >
                  Delete
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
