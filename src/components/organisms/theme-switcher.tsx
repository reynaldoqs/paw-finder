"use client";

import {
  ComputerIcon,
  Moon02Icon,
  Sun03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../atoms";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const ICON_SIZE = 16;
  const STROKE_WIDTH = 2;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size={"sm"}>
          {theme === "light" ? (
            <HugeiconsIcon
              key="light"
              icon={Sun03Icon}
              strokeWidth={STROKE_WIDTH}
              className={"text-muted-foreground"}
              style={{ width: ICON_SIZE, height: ICON_SIZE }}
            />
          ) : theme === "dark" ? (
            <HugeiconsIcon
              key="dark"
              icon={Moon02Icon}
              strokeWidth={STROKE_WIDTH}
              className={"text-muted-foreground"}
              style={{ width: ICON_SIZE, height: ICON_SIZE }}
            />
          ) : (
            <HugeiconsIcon
              key="system"
              icon={ComputerIcon}
              strokeWidth={STROKE_WIDTH}
              className={"text-muted-foreground"}
              style={{ width: ICON_SIZE, height: ICON_SIZE }}
            />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-content" align="start">
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(e) => setTheme(e)}
        >
          <DropdownMenuRadioItem className="flex gap-2" value="light">
            <HugeiconsIcon
              icon={Sun03Icon}
              strokeWidth={STROKE_WIDTH}
              className="text-muted-foreground"
              style={{ width: ICON_SIZE, height: ICON_SIZE }}
            />
            <span>Light</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="flex gap-2" value="dark">
            <HugeiconsIcon
              icon={Moon02Icon}
              strokeWidth={STROKE_WIDTH}
              className="text-muted-foreground"
              style={{ width: ICON_SIZE, height: ICON_SIZE }}
            />
            <span>Dark</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="flex gap-2" value="system">
            <HugeiconsIcon
              icon={ComputerIcon}
              strokeWidth={STROKE_WIDTH}
              className="text-muted-foreground"
              style={{ width: ICON_SIZE, height: ICON_SIZE }}
            />
            <span>System</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ThemeSwitcher };
