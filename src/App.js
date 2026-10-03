import { Box, CssBaseline, Snackbar, Stack, ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import { HashRouter, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Add from "./Components/Add";
import BottomNav from "./Components/BottomNav";
import { AppProvider, useApp } from "./context/AppContext";
import { makeTheme } from "./theme";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import FriendsPage from "./pages/FriendsPage";
import Groups from "./pages/Groups";
import Pages from "./pages/Pages";
import Marketplace from "./pages/Marketplace";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const ScrollTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Layout = () => {
  const { pathname } = useLocation();
  return (
    <Stack
      direction="row"
      spacing={{ xs: 0, sm: 2, lg: 3 }}
      justifyContent="space-between"
      sx={{ maxWidth: 1400, mx: "auto", px: { xs: 0, sm: 2 } }}
    >
      <Sidebar />
      {/* key re-mounts the page so each route animates in */}
      <Box key={pathname} className="page-in" flex={6} minWidth={0} display="flex" gap={3}>
        <Outlet />
      </Box>
    </Stack>
  );
};

const Shell = () => {
  const { mode, toast, notify } = useApp();
  const theme = useMemo(() => makeTheme(mode), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box bgcolor="background.default" color="text.primary" minHeight="100vh" pb={{ xs: 9, md: 0 }}>
        <ScrollTop />
        <Navbar />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="friends" element={<FriendsPage />} />
            <Route path="groups" element={<Groups />} />
            <Route path="pages" element={<Pages />} />
            <Route path="marketplace" element={<Marketplace />} />
            <Route path="messages" element={<Messages />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <Add />
        <BottomNav />
        <Snackbar
          open={!!toast}
          autoHideDuration={2500}
          onClose={() => notify("")}
          message={toast}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          sx={{ mb: { xs: 8, md: 0 } }}
        />
      </Box>
    </ThemeProvider>
  );
};

function App() {
  return (
    <AppProvider>
      {/* HashRouter works on any static host (GitHub Pages, Netlify…) without extra config */}
      <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Shell />
      </HashRouter>
    </AppProvider>
  );
}

export default App;
