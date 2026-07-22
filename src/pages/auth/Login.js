import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { AuthLayout } from "./AuthLayout";
import { Input, Button } from "../../components/ui";
import { Highlight } from "../../components/brand/Slogan";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate("/app"), 900);
  };

  return (
    <AuthLayout title="Welcome back." subtitle="Log in to pick up right where you left off.">
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="text-xs text-ink-muted mb-1.5 block">Email</label>
          <Input icon={Mail} type="email" placeholder="you@company.com" defaultValue="johan@horizonevents.co.za" required />
        </div>
        <div>
          <label className="text-xs text-ink-muted mb-1.5 block">Password</label>
          <Input icon={Lock} type="password" placeholder="••••••••••" defaultValue="password123" required />
        </div>
        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-ink-muted">
            <input type="checkbox" className="rounded accent-accent-blue" defaultChecked />
            Remember me
          </label>
          <button type="button" className="text-accent-blue hover:text-accent-cyan transition-colors">
            Forgot password?
          </button>
        </div>
        <Button type="submit" className="w-full" size="lg" disabled={loading} iconRight={<ArrowRight className="w-4 h-4" />}>
          {loading ? "Getting everything in SYNQ..." : "Log In"}
        </Button>
      </form>
      <p className="text-sm text-ink-muted text-center mt-8">
        <Highlight text="New to SYNQ?" />{" "}
        <Link to="/onboarding" className="text-accent-blue hover:text-accent-cyan transition-colors font-medium">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
