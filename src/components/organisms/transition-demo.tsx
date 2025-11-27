"use client";

import { useState } from "react";
import { Button } from "../atoms";
import { TransitionContainer } from "../molecules";

export const TransitionDemo: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <TransitionContainer isExpanded={isExpanded}>
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
          <h2 className="text-lg font-bold">
            {isExpanded ? "State B - Top Bar" : "State A - Centered"}
          </h2>
          <Button onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "Collapse" : "Expand"}
          </Button>
        </div>
      </TransitionContainer>

      {/* Background content */}
      <div className="min-h-screen p-8">
        <h1 className="text-2xl font-bold mb-4">Page Content</h1>
        <p className="text-muted-foreground">
          Click the button to toggle between states
        </p>
      </div>
    </>
  );
};
