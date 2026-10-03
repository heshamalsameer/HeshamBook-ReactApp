import { useState } from "react";
import { Bookmark, BookmarkBorder, Favorite, FavoriteBorder, MoreVert, Send, Share } from "@mui/icons-material";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Divider,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useApp } from "../context/AppContext";
import { initials } from "./Navbar";

const Post = (props) => {
  const { name, sub, image, description, color, index = 0 } = props;
  const { user: currentUser, notify, saved: savedIds, toggleSaved } = useApp();
  const saved = savedIds.includes(props.id);
  const setSaved = () => toggleSaved(props.id);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(props.likes ?? 0);
  const [comments, setComments] = useState(props.comments ?? []);
  const [showComments, setShowComments] = useState(false);
  const [text, setText] = useState("");
  const [menu, setMenu] = useState(null);

  const toggleLike = () => {
    setLiked((l) => !l);
    setLikes((n) => n + (liked ? -1 : 1));
  };

  const addComment = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setComments((c) => [...c, { by: currentUser.name, text: text.trim() }]);
    setText("");
  };

  const share = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.href}#post-${props.id}`);
      notify?.("Link copied to clipboard");
    } catch {
      notify?.("Sharing is not available here");
    }
  };

  return (
    <Card id={`post-${props.id}`} className="rise" style={{ animationDelay: `${Math.min(index, 4) * 90}ms` }} sx={{ mb: 3 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: color || "primary.main", fontWeight: 700 }}>{initials(name)}</Avatar>}
        action={
          <IconButton aria-label="post options" onClick={(e) => setMenu(e.currentTarget)}>
            <MoreVert />
          </IconButton>
        }
        title={<Typography fontWeight={700}>{name}</Typography>}
        subheader={sub}
      />
      <Menu anchorEl={menu} open={!!menu} onClose={() => setMenu(null)}>
        <MenuItem onClick={() => { if (!saved) setSaved(); setMenu(null); notify?.("Saved to your collection"); }}>Save post</MenuItem>
        <MenuItem onClick={() => { setMenu(null); notify?.("Thanks — we'll show fewer posts like this"); }}>Hide post</MenuItem>
      </Menu>
      <CardContent sx={{ pt: 0 }}>
        <Typography variant="body1">{description}</Typography>
      </CardContent>
      {image && (
        <Box sx={{ overflow: "hidden", "& img": { transition: "transform 1.2s cubic-bezier(.22,1,.36,1)" }, "&:hover img": { transform: "scale(1.04)" } }}>
          <CardMedia component="img" image={image} alt={`Post by ${name}`} loading="lazy" sx={{ aspectRatio: "16 / 10", objectFit: "cover" }} onDoubleClick={() => !liked && toggleLike()} />
        </Box>
      )}
      <Stack direction="row" justifyContent="space-between" px={2} pt={1.5} color="text.secondary">
        <Typography variant="body2" display="flex" alignItems="center" gap={0.5}>
          <Favorite sx={{ fontSize: 16, color: "#f44336" }} /> {likes}
        </Typography>
        <Typography variant="body2" sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }} onClick={() => setShowComments((s) => !s)}>
          {comments.length} comment{comments.length === 1 ? "" : "s"}
        </Typography>
      </Stack>
      <Divider sx={{ mx: 2, mt: 1 }} />
      <CardActions disableSpacing sx={{ justifyContent: "space-between", px: 1 }}>
        <Button
          onClick={toggleLike}
          color={liked ? "error" : "inherit"}
          startIcon={liked ? <Favorite className="pop" /> : <FavoriteBorder />}
          aria-pressed={liked}
        >
          Like
        </Button>
        <Button color="inherit" startIcon={<ChatBubbleOutlineOutlinedIcon />} onClick={() => setShowComments((s) => !s)}>
          Comment
        </Button>
        <Button color="inherit" startIcon={<Share />} onClick={share}>
          Share
        </Button>
        <IconButton onClick={setSaved} color={saved ? "primary" : "default"} aria-label="bookmark" aria-pressed={saved}>
          {saved ? <Bookmark /> : <BookmarkBorder />}
        </IconButton>
      </CardActions>

      <Collapse in={showComments} timeout="auto" unmountOnExit>
        <Box px={2} pb={2}>
          {comments.map((c, i) => (
            <Stack key={i} direction="row" spacing={1} mb={1.2} className="rise">
              <Avatar sx={{ width: 30, height: 30, fontSize: 12 }}>{initials(c.by)}</Avatar>
              <Box sx={{ bgcolor: "action.hover", px: 1.5, py: 1, borderRadius: 3 }}>
                <Typography variant="body2" fontWeight={700}>{c.by}</Typography>
                <Typography variant="body2">{c.text}</Typography>
              </Box>
            </Stack>
          ))}
          <Stack component="form" onSubmit={addComment} direction="row" spacing={1} alignItems="center" mt={1}>
            <Avatar sx={{ width: 30, height: 30, fontSize: 12, bgcolor: currentUser.color }}>{initials(currentUser.name)}</Avatar>
            <InputBase
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write a comment…"
              sx={{ flex: 1, bgcolor: "action.hover", px: 2, py: 0.6, borderRadius: 999 }}
            />
            <IconButton type="submit" color="primary" disabled={!text.trim()} aria-label="send comment">
              <Send />
            </IconButton>
          </Stack>
        </Box>
      </Collapse>
    </Card>
  );
};

export default Post;
