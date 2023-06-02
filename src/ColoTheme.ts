import { PaletteMode, createTheme } from "@mui/material";
import { useState, useMemo } from "react";

export default function ToggleColorMode() {
    const [mode, setMode] = useState<PaletteMode>('light');

    const toggleMode = () =>
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));

    const toggleTheme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode],
    );

    return {
        theme: toggleTheme,
        mode,
        toggleMode
    }
}