"use client"

import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes"

export function ModeToggle() {
    const { setTheme, theme } = useTheme();

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
    };

    return (
        <Button variant="outline" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </Button>
    );
}