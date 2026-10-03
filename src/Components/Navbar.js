import { useState } from "react";
import { DarkMode, LightMode, Mail, Notifications, Search as SearchIcon, BubbleChart } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  InputBase,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import { AccountCircle, Logout, Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const StyleToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  gap: 16,
  maxWidth: 1400,
  width: "100%",
  margin: "0 auto",
});

const Search = styled("label")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  backgroundColor: alpha(theme.palette.common.white, 0.18),
  padding: "6px 14px",
  borderRadius: 999,
  width: "min(480px, 100%)",
  transition: "background-color .3s, box-shadow .3s",
  "&:focus-within": {
    backgroundColor: alpha(theme.palette.common.white, 0.28),
    boxShadow: `0 0 0 3px ${alpha(theme.palette.common.white, 0.25)}`,
  },
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  gap: 8,
  alignItems: "center",
  [theme.breakpoints.up("sm")]: { display: "flex" },
}));

export const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const Navbar = () => {
  const { query, setQuery, mode, toggleMode, user, unreadCount, threads } = useApp();
  const navigate = useNavigate();
  const [anchor, setAnchor] = useState(null);
  const handleClose = () => setAnchor(null);
  const go = (to) => {
    handleClose();
    navigate(to);
  };
  const unreadMsgs = threads.filter((t) => t.messages[t.messages.length - 1]?.from === "them").length;

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backdropFilter: "blur(12px)",
        backgroundColor: (t) => (t.palette.mode === "dark" ? alpha("#1e1e1e", 0.9) : alpha(t.palette.primary.main, 0.92)),
        color: "#fff",
        borderBottom: (t) => (t.palette.mode === "dark" ? "1px solid rgba(255,255,255,.08)" : "none"),
      }}
    >
      <StyleToolbar>
        <Box display="flex" alignItems="center" gap={1} sx={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          <BubbleChart sx={{ fontSize: 30 }} />
          <Typography sx={{ display: { xs: "none", sm: "block" }, letterSpacing: "-0.02em" }} variant="h6">
            Circle
          </Typography>
        </Box>

        <Search>
          <SearchIcon fontSize="small" sx={{ opacity: 0.85 }} />
          <InputBase
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              navigate("/");
            }}
            placeholder="Search posts and people…"
            sx={{ width: "100%", color: "inherit" }}
            inputProps={{ "aria-label": "search" }}
          />
        </Search>

        <Icons>
          <Tooltip title={mode === "light" ? "Dark mode" : "Light mode"}>
            <IconButton color="inherit" onClick={toggleMode}>
              {mode === "light" ? <DarkMode /> : <LightMode />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Messages">
            <IconButton color="inherit" onClick={() => navigate("/messages")}>
              <Badge badgeContent={unreadMsgs} color="error">
                <Mail />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton color="inherit" onClick={() => navigate("/notifications")}>
              <Badge badgeContent={unreadCount} color="error">
                <Notifications />
              </Badge>
            </IconButton>
          </Tooltip>
        </Icons>
        <IconButton onClick={(e) => setAnchor(e.currentTarget)} sx={{ p: 0.5 }} aria-label="Account menu">
          <Avatar sx={{ width: 34, height: 34, bgcolor: "common.white", color: "primary.main", fontSize: 14, fontWeight: 700 }}>
            {initials(user.name)}
          </Avatar>
        </IconButton>
      </StyleToolbar>

      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{ paper: { sx: { mt: 1, minWidth: 220, borderRadius: 3 } } }}
      >
        <Box px={2} py={1}>
          <Typography fontWeight={700}>{user.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {user.handle}
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={() => go("/profile")}>
          <ListItemIcon><AccountCircle fontSize="small" /></ListItemIcon>Profile
        </MenuItem>
        <MenuItem onClick={() => go("/settings")}>
          <ListItemIcon><Settings fontSize="small" /></ListItemIcon>My account
        </MenuItem>
        <MenuItem onClick={() => go("/")}>
          <ListItemIcon><Logout fontSize="small" /></ListItemIcon>Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
