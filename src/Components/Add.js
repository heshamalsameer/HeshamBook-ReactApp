import { useEffect, useRef, useState } from "react";
import { Add as AddIcon, Close, DateRange, EmojiEmotions, Image, PersonAdd, VideoCameraBack } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Fab,
  IconButton,
  Modal,
  Stack,
  TextField,
  Tooltip,
  Typography,
  Fade,
  styled,
} from "@mui/material";
import { photos } from "../data/Data";
import { useApp } from "../context/AppContext";
import { initials } from "./Navbar";

const StyledModel = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 16,
});

const BoxModal = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "min(540px, 100%)",
  maxHeight: "92vh",
  overflowY: "auto",
  borderRadius: 22,
  padding: 28,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[24],
  outline: "none",
}));

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginBottom: 16,
});

const emojis = ["😀", "🔥", "🎉", "❤️", "🌊", "☕"];

const Add = () => {
  const { composerOpen: open, setComposerOpen: setOpen, addPost: onPost, user: currentUser } = useApp();
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    if (!open) {
      setText("");
      setImage(null);
      setShowEmoji(false);
    }
  }, [open]);

  const pickFile = (e) => {
    const f = e.target.files?.[0];
    if (f) setImage(URL.createObjectURL(f));
  };

  const submit = () => {
    if (!text.trim() && !image) return;
    onPost({
      id: Date.now(),
      name: currentUser.name,
      color: currentUser.color,
      sub: "Just now",
      description: text.trim(),
      image,
      likes: 0,
      comments: [],
    });
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Create post" arrow placement="right">
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            bottom: 28,
            left: 28,
            display: { xs: "none", md: "flex" },
            transition: "transform .3s",
            "&:hover": { transform: "rotate(90deg) scale(1.05)" },
          }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <StyledModel open={open} onClose={() => setOpen(false)} closeAfterTransition aria-labelledby="create-post-title">
        <Fade in={open}>
          <BoxModal>
            <IconButton onClick={() => setOpen(false)} sx={{ position: "absolute", top: 14, right: 14 }} aria-label="close">
              <Close />
            </IconButton>
            <Typography id="create-post-title" variant="h6" textAlign="center" mb={2}>
              Create Post
            </Typography>
            <UserBox>
              <Avatar sx={{ bgcolor: currentUser.color, fontWeight: 700 }}>{initials(currentUser.name)}</Avatar>
              <Box>
                <Typography fontWeight={600}>{currentUser.name}</Typography>
                <Typography variant="caption" color="text.secondary">Public</Typography>
              </Box>
            </UserBox>
            <TextField
              autoFocus
              multiline
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's on your mind?"
              variant="standard"
              InputProps={{ disableUnderline: true, sx: { fontSize: 20 } }}
              sx={{ width: "100%" }}
            />

            {image && (
              <Box position="relative" mt={2} borderRadius={3} overflow="hidden">
                <img src={image} alt="Attachment preview" style={{ width: "100%", maxHeight: 240, objectFit: "cover", display: "block" }} />
                <IconButton size="small" onClick={() => setImage(null)} sx={{ position: "absolute", top: 8, right: 8, bgcolor: "rgba(0,0,0,.55)", color: "#fff", "&:hover": { bgcolor: "rgba(0,0,0,.75)" } }}>
                  <Close fontSize="small" />
                </IconButton>
              </Box>
            )}

            {!image && (
              <Stack direction="row" spacing={1} mt={2} sx={{ overflowX: "auto" }}>
                {photos.map((p) => (
                  <Box key={p} component="button" onClick={() => setImage(p)} aria-label="Use this image"
                    sx={{ flex: "0 0 64px", height: 48, p: 0, border: 0, borderRadius: 2, overflow: "hidden", cursor: "pointer", opacity: 0.8, transition: "opacity .2s, transform .2s", "&:hover": { opacity: 1, transform: "translateY(-2px)" } }}>
                    <img src={p} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </Box>
                ))}
              </Stack>
            )}

            {showEmoji && (
              <Stack direction="row" spacing={1} mt={2}>
                {emojis.map((em) => (
                  <Button key={em} size="small" onClick={() => setText((t) => t + em)} sx={{ minWidth: 0, fontSize: 22 }}>{em}</Button>
                ))}
              </Stack>
            )}

            <Stack direction="row" spacing={0.5} mt={2} mb={3}>
              <IconButton onClick={() => setShowEmoji((s) => !s)} aria-label="emoji"><EmojiEmotions color="primary" /></IconButton>
              <IconButton onClick={() => fileRef.current?.click()} aria-label="upload image"><Image color="secondary" /></IconButton>
              <IconButton aria-label="video"><VideoCameraBack color="success" /></IconButton>
              <IconButton aria-label="tag friends"><PersonAdd color="error" /></IconButton>
              <input ref={fileRef} type="file" accept="image/*" hidden onChange={pickFile} />
            </Stack>
            <ButtonGroup fullWidth variant="contained" disableElevation>
              <Button onClick={submit} disabled={!text.trim() && !image} sx={{ py: 1.2 }}>Post</Button>
              <Button sx={{ width: 100 }} aria-label="schedule">
                <DateRange />
              </Button>
            </ButtonGroup>
          </BoxModal>
        </Fade>
      </StyledModel>
    </>
  );
};

export default Add;
