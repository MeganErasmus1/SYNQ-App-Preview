import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui";
import { QMark } from "../components/nova/NovaWidget";
import { Highlight } from "../components/brand/Slogan";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col items-center justify-center gap-6 px-6 text-center">
      <QMark size={48} />
      <div>
        <h1 className="text-2xl font-semibold mb-2">
          <Highlight text="This page hasn't made it into SYNQ yet." />
        </h1>
        <p className="text-ink-muted">Let's get you back to somewhere real.</p>
      </div>
      <Link to="/app">
        <Button>Back to Mission Control</Button>
      </Link>
    </div>
  );
}
