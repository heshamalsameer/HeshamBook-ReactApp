import { useEffect, useRef, useState } from "react";
import { Avatar, Badge, Box, Card, IconButton, InputBase, List, ListItemAvatar, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import { ArrowBack, EmojiEmotions, Send } from "@mui/icons-material";
import { useApp } from "../context/AppContext";
import { initials } from "../Components/Navbar";

const replies = ["Haha nice 😄", "Sounds great!", "Let me check and get back to you.", "100% 👍", "Sure, see you then!", "That's amazing 🔥"];

const Messages = () => {
  const { threads, sendMessage, receiveMessage, user } = useApp();
  const [activeId, setActiveId] = useState(threads[0]?.id);
  const [mobileChat, setMobileChat] = useState(false);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);
  const active = threads.find((t) => t.id === activeId);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [active?.messages.length, typing]);

  const send = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    sendMessage(activeId, text.trim());
    setText("");
    // fake reply with typing indicator
    const id = activeId;
    setTimeout(() => setTyping(true), 600);
    setTimeout(() => {
      setTyping(false);
      receiveMessage(id, replies[Math.floor(Math.random() * replies.length)]);
    }, 2000);
  };

  return (
    <Box flex={1} p={{ xs: 0, sm: 2 }} maxWidth={1100} mx="auto" width="100%">
      <Card sx={{ display: "flex", height: { xs: "calc(100vh - 64px - 72px)", md: "calc(100vh - 110px)" }, borderRadius: { xs: 0, sm: 4 } }}>
        {/* thread list */}
        <Box sx={{ width: { xs: "100%", sm: 320 }, borderRight: 1, borderColor: "divider", display: { xs: mobileChat ? "none" : "block", sm: "block" }, overflowY: "auto" }}>
          <Typography variant="h6" p={2}>Chats</Typography>
          <List disablePadding>
            {threads.map((t) => {
              const last = t.messages[t.messages.length - 1];
              return (
                <ListItemButton key={t.id} selected={t.id === activeId} onClick={() => { setActiveId(t.id); setMobileChat(true); }} sx={{ mx: 1, mb: 0.5 }}>
                  <ListItemAvatar>
                    <Badge overlap="circular" variant="dot" color="success" invisible={!t.online} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
                      <Avatar sx={{ bgcolor: t.color, fontWeight: 700 }}>{initials(t.name)}</Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography fontWeight={last?.from === "them" ? 700 : 500}>{t.name}</Typography>}
                    secondary={<Typography variant="body2" color="text.secondary" noWrap>{last?.from === "me" ? "You: " : ""}{last?.text}</Typography>}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </Box>

        {/* chat */}
        {active && (
          <Box flex={1} display={{ xs: mobileChat ? "flex" : "none", sm: "flex" }} flexDirection="column" minWidth={0}>
            <Stack direction="row" alignItems="center" gap={1.5} p={2} borderBottom={1} borderColor="divider">
              <IconButton sx={{ display: { sm: "none" } }} onClick={() => setMobileChat(false)}><ArrowBack /></IconButton>
              <Avatar sx={{ bgcolor: active.color, fontWeight: 700 }}>{initials(active.name)}</Avatar>
              <Box>
                <Typography fontWeight={700}>{active.name}</Typography>
                <Typography variant="caption" color={active.online ? "success.main" : "text.secondary"}>{active.online ? "Active now" : "Offline"}</Typography>
              </Box>
            </Stack>
            <Box flex={1} overflow="auto" p={2} display="flex" flexDirection="column" gap={1}>
              {active.messages.map((m, i) => {
                const mine = m.from === "me";
                return (
                  <Stack key={i} direction="row" justifyContent={mine ? "flex-end" : "flex-start"} gap={1} className="rise">
                    {!mine && <Avatar sx={{ width: 28, height: 28, fontSize: 12, bgcolor: active.color }}>{initials(active.name)}</Avatar>}
                    <Box sx={{ maxWidth: "72%", px: 2, py: 1, borderRadius: 4, borderBottomRightRadius: mine ? 6 : 16, borderBottomLeftRadius: mine ? 16 : 6, bgcolor: mine ? "primary.main" : "action.hover", color: mine ? "#fff" : "text.primary" }}>
                      <Typography variant="body2">{m.text}</Typography>
                      <Typography variant="caption" sx={{ opacity: 0.7 }}>{m.time}</Typography>
                    </Box>
                  </Stack>
                );
              })}
              {typing && (
                <Stack direction="row" gap={1} alignItems="center" color="text.secondary">
                  <Avatar sx={{ width: 28, height: 28, fontSize: 12, bgcolor: active.color }}>{initials(active.name)}</Avatar>
                  <Box className="typing" sx={{ px: 2, py: 1.2, borderRadius: 4, bgcolor: "action.hover" }}><span /><span /><span /></Box>
                </Stack>
              )}
              <div ref={endRef} />
            </Box>
            <Stack component="form" onSubmit={send} direction="row" gap={1} alignItems="center" p={1.5} borderTop={1} borderColor="divider">
              <IconButton onClick={() => setText((t) => t + "😊")}><EmojiEmotions color="primary" /></IconButton>
              <InputBase value={text} onChange={(e) => setText(e.target.value)} placeholder={`Message ${active.name.split(" ")[0]}…`} sx={{ flex: 1, bgcolor: "action.hover", px: 2, py: 1, borderRadius: 999 }} inputProps={{ "aria-label": "message" }} />
              <IconButton type="submit" color="primary" disabled={!text.trim()} aria-label="send"><Send /></IconButton>
            </Stack>
          </Box>
        )}
      </Card>
      <Typography variant="caption" color="text.secondary" display="block" textAlign="center" mt={1}>
        Signed in as {user.name} · demo chat with automatic replies
      </Typography>
    </Box>
  );
};

export default Messages;
