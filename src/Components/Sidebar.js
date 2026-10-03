import { AccountBox, Article, Group, Home, ModeNight, Person, Settings, Storefront, Mail, Notifications } from "@mui/icons-material";
import { Box, Card, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch, Typography } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";

const Sidebar = () => {
  const { mode, toggleMode, joinedGroups, unreadCount, cart } = useApp();
  const { pathname } = useLocation();
  const items = [
    { label: "HomePage", icon: <Home />, to: "/" },
    { label: "Pages", icon: <Article />, to: "/pages" },
    { label: "Groups", icon: <Group />, to: "/groups", badge: joinedGroups.length },
    { label: "Marketplace", icon: <Storefront />, to: "/marketplace", badge: cart.reduce((n, c) => n + c.qty, 0) },
    { label: "Friends", icon: <Person />, to: "/friends" },
    { label: "Messages", icon: <Mail />, to: "/messages" },
    { label: "Notifications", icon: <Notifications />, to: "/notifications", badge: unreadCount, danger: true },
    { label: "Settings", icon: <Settings />, to: "/settings" },
    { label: "Profile", icon: <AccountBox />, to: "/profile" },
  ];
  return (
    <Box sx={{ display: { xs: "none", md: "block" }, flex: "0 0 260px" }} p={2}>
      <Box position="sticky" top={80}>
        <List sx={{ display: "grid", gap: 0.5 }}>
          {items.map((it) => (
            <ListItem key={it.label} disablePadding>
              <ListItemButton component={NavLink} to={it.to} selected={pathname === it.to}>
                <ListItemIcon sx={{ minWidth: 42 }}>{it.icon}</ListItemIcon>
                <ListItemText primary={it.label} primaryTypographyProps={{ fontWeight: 500 }} />
                {!!it.badge && (
                  <Box
                    component="span"
                    sx={{ px: 1, borderRadius: 999, bgcolor: it.danger ? "error.main" : "primary.main", color: "#fff", fontSize: 12, fontWeight: 700 }}
                  >
                    {it.badge}
                  </Box>
                )}
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton onClick={toggleMode}>
              <ListItemIcon sx={{ minWidth: 42 }}>
                <ModeNight />
              </ListItemIcon>
              <ListItemText primary="Dark mode" primaryTypographyProps={{ fontWeight: 500 }} />
              <Switch edge="end" checked={mode === "dark"} onClick={(e) => e.stopPropagation()} onChange={toggleMode} />
            </ListItemButton>
          </ListItem>
        </List>

        <Card sx={{ mt: 2, p: 2.5, background: "linear-gradient(135deg, #1976d2, #0d47a1)", color: "#fff" }}>
          <Typography fontWeight={700}>Go Premium ✨</Typography>
          <Typography variant="body2" sx={{ opacity: 0.85, mt: 0.5 }}>
            Custom themes, longer videos and zero ads.
          </Typography>
        </Card>
      </Box>
    </Box>
  );
};

export default Sidebar;
