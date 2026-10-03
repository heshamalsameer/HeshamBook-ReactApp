import { AddCircle, Group, Home, Notifications, Storefront } from "@mui/icons-material";
import { Badge, BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const routes = ["/", "/groups", null, "/marketplace", "/notifications"];

// Mobile bottom navigation
const BottomNav = () => {
  const { setComposerOpen, unreadCount } = useApp();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const idx = routes.indexOf(pathname);
  const value = idx === -1 ? false : idx;
  return (
    <Paper
      elevation={8}
      sx={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 10, display: { md: "none" }, borderRadius: "18px 18px 0 0", overflow: "hidden" }}
    >
      <BottomNavigation value={value} onChange={(_, v) => (v === 2 ? setComposerOpen(true) : navigate(routes[v]))} showLabels>
        <BottomNavigationAction label="Home" icon={<Home />} />
        <BottomNavigationAction label="Groups" icon={<Group />} />
        <BottomNavigationAction label="Post" icon={<AddCircle sx={{ fontSize: 34 }} color="primary" />} />
        <BottomNavigationAction label="Market" icon={<Storefront />} />
        <BottomNavigationAction label="Alerts" icon={<Badge badgeContent={unreadCount} color="error"><Notifications /></Badge>} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
