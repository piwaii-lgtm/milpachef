import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Milpa Chef" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/admin" });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // staff can type a plain username (e.g. "admin"); map it to the staff mailbox
      const identifier = email.trim().toLowerCase();
      const resolvedEmail = identifier.includes("@")
        ? identifier
        : `${identifier}@milpachef.com`;
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({
          email: resolvedEmail,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email: resolvedEmail,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
      }
      navigate({ to: "/admin" });
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container-editorial py-24 max-w-md">
      <h1 className="font-serif text-4xl text-primary mb-2">
        {mode === "signin" ? "Sign in" : "Create account"}
      </h1>
      <p className="text-sm text-muted-foreground mb-8">
        Admin area for Milpa Chef staff.
      </p>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">
            Username or email
          </label>
          <input
            required
            type="text"
            autoComplete="username"
            placeholder="admin"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-input bg-background rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">
            Password
          </label>
          <input
            required
            type="password"
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-input bg-background rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-sm bg-primary text-primary-foreground px-6 py-3 hover:bg-[color:var(--milpa-deep)] disabled:opacity-60"
        >
          {loading ? "…" : mode === "signin" ? "Sign in" : "Create account"}
        </button>
        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="w-full text-sm text-muted-foreground underline"
        >
          {mode === "signin" ? "No account? Create one" : "Already have an account? Sign in"}
        </button>
        <Link to="/" className="block text-center text-xs text-muted-foreground mt-6">
          ← Back to site
        </Link>
      </form>
    </section>
  );
}