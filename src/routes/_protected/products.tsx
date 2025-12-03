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

    if (window.confirm("Delete this product?")) {
      await deleteProducts(id);
      window.location.reload();
    }
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="rounded-xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-950 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Products</h1>
            <p className="mt-1 text-slate-400">{products?.length ?? 0} items</p>
          </div>
          {(canEdit || canDelete) && (
            <div className="flex gap-2 text-sm text-slate-300">
              {canEdit && (
                <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-emerald-300">
                  Edit
                </span>
              )}
              {canDelete && (
                <span className="rounded-full border border-rose-400/30 bg-rose-400/10 px-3 py-1 text-rose-300">
                  Delete
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Empty State */}
      {(!products || products.length === 0) && (
        <div className="rounded-lg border border-slate-700 bg-slate-900 p-8 text-center text-slate-400">
          No products available
        </div>
      )}

      {/* Product Grid */}
      {products && products.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product: Product) => (
            <article
              key={product.id}
              className="rounded-lg border border-slate-700 bg-slate-900 p-6 transition hover:border-slate-600 hover:bg-slate-800"
            >
              <div className="space-y-2">
                <p className="text-xs text-slate-500">#{product.id}</p>
                <h3 className="font-semibold text-white">{product.name}</h3>
                <p className="text-xl font-bold text-emerald-400">
                  ${product.price}
                </p>
              </div>

              {(canEdit || canDelete) && (
                <div className="mt-4 flex gap-2">
                  {canEdit && (
                    <button
                      onClick={() => alert(`Edit: ${product.name}`)}
                      className="flex-1 rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm font-medium text-slate-300 transition hover:border-slate-500 hover:bg-slate-700"
                    >
                      Edit
                    </button>
                  )}
                  {canDelete && (
                    <button
                      onClick={(e) => handleDelete(product.id, e)}
                      className="flex-1 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm font-medium text-rose-300 transition hover:bg-rose-500/20"
                    >
                      Delete
                    </button>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
