import { createTheme, alpha } from "@mui/material";

// Keeps Material UI's default palette (primary blue #1976d2) — only shape, type and polish change.
export const makeTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      background:
        mode === "light"
          ? { default: "#f0f2f5", paper: "#ffffff" }
          : { default: "#121212", paper: "#1e1e1e" },
    },
    shape: { borderRadius: 14 },
    typography: {
      fontFamily: "'Roboto', sans-serif",
      h6: { fontWeight: 700 },
      button: { textTransform: "none", fontWeight: 600 },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 18,
            boxShadow:
              theme.palette.mode === "light"
                ? "0 1px 2px rgba(0,0,0,.06), 0 8px 24px -12px rgba(0,0,0,.12)"
                : "0 0 0 1px rgba(255,255,255,.06)",
          }),
        },
      },
      MuiButton: { styleOverrides: { root: { borderRadius: 999 } } },
      MuiListItemButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 12,
            "&.Mui-selected": {
              backgroundColor: alpha(theme.palette.primary.main, 0.12),
              color: theme.palette.primary.main,
              "& .MuiListItemIcon-root": { color: theme.palette.primary.main },
            },
          }),
        },
      },
    },
  });
