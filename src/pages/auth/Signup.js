import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { AuthLayout } from "./AuthLayout";
import { Input, Button } from "../../components/ui";
import { Highlight } from "../../components/brand/Slogan";

export default function Signup() {
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    navigate("/onboarding");
  };

  return (
    <AuthLayout
      title="Let's build something impressive."
      subtitle={<Highlight text="Create your SYNQ account in under a minute." />}
    >
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="text-xs text-ink-muted mb-1.5 block">Full name</label>
          <Input icon={User} placeholder="Your full name" required />
        </div>
        <div>
          <label className="text-xs text-ink-muted mb-1.5 block">Work email</label>
          <Input icon={Mail} type="email" placeholder="you@company.com" required />
        </div>
        <div>
          <label className="text-xs text-ink-muted mb-1.5 block">Password</label>
          <Input icon={Lock} type="password" placeholder="Create a password" required />
        </div>
        <Button type="submit" className="w-full" size="lg" iconRight={<ArrowRight className="w-4 h-4" />}>
          Create Account
        </Button>
      </form>
      <p className="text-sm text-ink-muted text-center mt-8">
        <Highlight text="Already on SYNQ?" />{" "}
        <Link to="/login" className="text-accent-blue hover:text-accent-cyan transition-colors font-medium">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}
