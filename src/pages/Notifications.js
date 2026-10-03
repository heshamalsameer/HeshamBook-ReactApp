import { useState } from "react";
import { Avatar, Badge, Box, Button, Card, Chip, IconButton, List, ListItemAvatar, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import { Cake, ChatBubble, DeleteOutline, DoneAll, Favorite, Group, Notifications as Bell, PersonAdd } from "@mui/icons-material";
import PageHeader from "./PageHeader";
import { Empty } from "./Profile";
import { useApp } from "../context/AppContext";
import { initials } from "../Components/Navbar";

const icon = { like: <Favorite sx={{ fontSize: 14 }} />, comment: <ChatBubble sx={{ fontSize: 14 }} />, friend: <PersonAdd sx={{ fontSize: 14 }} />, group: <Group sx={{ fontSize: 14 }} />, birthday: <Cake sx={{ fontSize: 14 }} /> };
const tint = { like: "#f44336", comment: "#1976d2", friend: "#4caf50", group: "#9c27b0", birthday: "#ff9800" };

const Notifications = () => {
  const { notifications, setNotifications, unreadCount } = useApp();
  const [filter, setFilter] = useState("all");
  const list = notifications.filter((n) => (filter === "all" ? true : !n.read));

  const markAll = () => setNotifications((ns) => ns.map((n) => ({ ...n, read: true })));
  const toggleRead = (id) => setNotifications((ns) => ns.map((n) => (n.id === id ? { ...n, read: true } : n)));
  const remove = (id) => setNotifications((ns) => ns.filter((n) => n.id !== id));

  return (
    <Box flex={1} p={{ xs: 1.5, sm: 2 }} maxWidth={760} mx="auto" width="100%">
      <PageHeader
        icon={<Bell />}
        title="Notifications"
        subtitle={unreadCount ? `${unreadCount} unread` : "You're all caught up"}
        action={<Button startIcon={<DoneAll />} onClick={markAll} disabled={!unreadCount}>Mark all as read</Button>}
      />
      <Stack direction="row" gap={1} mb={2}>
        <Chip label="All" color={filter === "all" ? "primary" : "default"} onClick={() => setFilter("all")} />
        <Chip label={`Unread (${unreadCount})`} color={filter === "unread" ? "primary" : "default"} onClick={() => setFilter("unread")} />
      </Stack>
      {list.length === 0 ? (
        <Empty text="Nothing new here." />
      ) : (
        <Card>
          <List disablePadding>
            {list.map((n) => (
              <ListItemButton
                key={n.id}
                onClick={() => toggleRead(n.id)}
                className="rise"
                sx={{ py: 1.5, borderRadius: 0, bgcolor: n.read ? "transparent" : (t) => (t.palette.mode === "light" ? "rgba(25,118,210,.06)" : "rgba(144,202,249,.08)") }}
              >
                <ListItemAvatar>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    badgeContent={<Box sx={{ width: 22, height: 22, borderRadius: "50%", bgcolor: tint[n.type], color: "#fff", display: "grid", placeItems: "center", border: 2, borderColor: "background.paper" }}>{icon[n.type]}</Box>}
                  >
                    <Avatar sx={{ width: 48, height: 48, bgcolor: n.color, fontWeight: 700 }}>{initials(n.who)}</Avatar>
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  sx={{ ml: 1 }}
                  primary={<Typography><b>{n.who}</b> {n.text}</Typography>}
                  secondary={<Typography variant="caption" color={n.read ? "text.secondary" : "primary"} fontWeight={n.read ? 400 : 700}>{n.time} ago</Typography>}
                />
                {!n.read && <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "primary.main", mr: 1 }} />}
                <IconButton edge="end" onClick={(e) => { e.stopPropagation(); remove(n.id); }} aria-label="remove notification"><DeleteOutline /></IconButton>
              </ListItemButton>
            ))}
          </List>
        </Card>
      )}
    </Box>
  );
};

export default Notifications;
