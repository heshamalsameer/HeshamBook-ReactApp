import { EmojiEmotions, Image, VideoCameraBack } from "@mui/icons-material";
import { Avatar, Box, Button, Card, Divider, Stack } from "@mui/material";
import { useApp } from "../context/AppContext";
import { initials } from "./Navbar";

// Inline "What's on your mind?" card — opens the Create Post modal
const Composer = ({ onCompose }) => {
  const { user: currentUser } = useApp();
  return (
  <Card sx={{ p: 2, mb: 3 }}>
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Avatar sx={{ bgcolor: currentUser.color, fontWeight: 700 }}>{initials(currentUser.name)}</Avatar>
      <Box
        component="button"
        onClick={onCompose}
        sx={{
          flex: 1,
          textAlign: "left",
          border: 0,
          cursor: "pointer",
          px: 2,
          py: 1.4,
          borderRadius: 999,
          font: "inherit",
          color: "text.secondary",
          bgcolor: "action.hover",
          transition: "background-color .2s",
          "&:hover": { bgcolor: "action.selected" },
        }}
      >
        What's on your mind, {currentUser.name.split(" ")[0]}?
      </Box>
    </Stack>
    <Divider sx={{ my: 1.5 }} />
    <Stack direction="row" justifyContent="space-around">
      <Button onClick={onCompose} startIcon={<VideoCameraBack color="error" />} color="inherit">Live video</Button>
      <Button onClick={onCompose} startIcon={<Image color="success" />} color="inherit">Photo</Button>
      <Button onClick={onCompose} startIcon={<EmojiEmotions color="warning" />} color="inherit" sx={{ display: { xs: "none", sm: "inline-flex" } }}>Feeling</Button>
    </Stack>
  </Card>
  );
};

export default Composer;
