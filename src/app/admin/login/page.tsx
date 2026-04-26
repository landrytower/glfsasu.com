"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { LogIn, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const { login, user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Already logged in as admin — redirect
  if (!loading && user && isAdmin) {
    router.replace("/admin");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      router.push("/admin");
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code ?? "";
      if (code === "auth/invalid-credential" || code === "auth/wrong-password") {
        setError("Email ou mot de passe incorrect.");
      } else if (code === "auth/user-not-found") {
        setError("Aucun compte associé à cet email.");
      } else if (code === "auth/too-many-requests") {
        setError("Trop de tentatives. Réessayez plus tard.");
      } else {
        setError("Erreur de connexion. Réessayez.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-900 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <span className="font-mono text-sm tracking-[0.3em] text-paper-50/50 uppercase">
            Administration
          </span>
          <h1 className="mt-4 font-display text-3xl text-paper-50 tracking-tight">
            Groupe Lipanda FAMILY
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-paper-50 border border-ink/10 p-8 space-y-6"
        >
          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 text-red-800 text-sm">
              <AlertCircle className="size-4 mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          <div>
            <label className="font-mono-label text-ink-muted block mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-ink/20 px-0 py-3 text-base focus:border-bordeaux-700 focus:outline-none transition-colors"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="font-mono-label text-ink-muted block mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-ink/20 px-0 py-3 text-base focus:border-bordeaux-700 focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 bg-bordeaux-700 text-paper-50 py-3.5 text-sm font-medium hover:bg-bordeaux-800 disabled:opacity-50 transition-colors"
          >
            <LogIn className="size-4" />
            {submitting ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className="mt-6 text-center font-mono text-xs text-paper-50/40">
          Accès réservé aux administrateurs du Groupe Lipanda FAMILY
        </p>
      </div>
    </div>
  );
}
