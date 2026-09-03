import { Link } from "@tanstack/react-router";

const tabs = [
  { to: "/admin", label: "Bookings" },
  { to: "/admin/tours", label: "Experience cards" },
  { to: "/admin/products", label: "Products" },
] as const;

export function AdminTabs() {
  return (
    <nav className="flex gap-1 border border-border rounded-sm p-1 bg-card w-fit mb-8">
      {tabs.map((t) => (
        <Link
          key={t.to}
          to={t.to}
          activeOptions={{ exact: true }}
          activeProps={{ className: "bg-primary text-primary-foreground" }}
          inactiveProps={{ className: "text-muted-foreground hover:text-primary" }}
          className="px-4 py-2 text-xs uppercase tracking-widest rounded-sm"
        >
          {t.label}
        </Link>
      ))}
    </nav>
  );
}