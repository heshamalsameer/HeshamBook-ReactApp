import { Avatar, Card, List, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";
import { conversations } from "../data/Data";
import { useNavigate } from "react-router-dom";
import { initials } from "./Navbar";

const Conversations = () => {
  const navigate = useNavigate();
  return (
  <Card sx={{ p: 2 }}>
    <Typography variant="subtitle1" fontWeight={700} mb={0.5}>Latest Conversations</Typography>
    <List disablePadding>
      {conversations.map((c) => (
        <ListItemButton key={c.title} alignItems="flex-start" sx={{ px: 1 }} onClick={() => navigate("/messages")}>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: c.color, fontWeight: 700, fontSize: 15 }}>{initials(c.from)}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography fontWeight={600} display="flex" justifyContent="space-between">
                {c.title}
                <Typography component="span" variant="caption" color="text.secondary">{c.time}</Typography>
              </Typography>
            }
            secondary={
              <>
                <Typography component="span" variant="body2" color="text.primary" fontWeight={500}>{c.from}</Typography>
                {" — "}
                {c.text}
              </>
            }
          />
        </ListItemButton>
      ))}
    </List>
  </Card>
  );
};

export default Conversations;
