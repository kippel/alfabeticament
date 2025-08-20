// app/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const percentage = 75;

  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-[350px]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Progress</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            Toggle {theme === "dark" ? "Light" : "Dark"}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="w-40 mx-auto">
            <CircularProgressbarWithChildren
              value={percentage}
              styles={buildStyles({
                pathColor: "#3b82f6",
                trailColor: theme === "dark" ? "#374151" : "#e5e7eb",
              })}
            >
              <div className="flex flex-col items-center justify-center">
                <span
                  className={`text-xl font-bold ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  {percentage}%
                </span>
                <span className="text-sm text-muted-foreground">Completed</span>
              </div>
            </CircularProgressbarWithChildren>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
