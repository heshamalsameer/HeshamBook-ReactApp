import { useState } from "react";
import { Avatar, Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, ImageList, ImageListItem, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { CalendarMonth, Edit, LocationOn } from "@mui/icons-material";
import Post from "../Components/Post";
import { initials } from "../Components/Navbar";
import { useApp } from "../context/AppContext";
import { photos } from "../data/Data";
import cover from "../assets/posts/aurora.jpg";

const Profile = () => {
  const { user, setUser, posts, saved, friendsIds, notify, setComposerOpen } = useApp();
  const [tab, setTab] = useState(0);
  const [edit, setEdit] = useState(false);
  const [draft, setDraft] = useState(user);

  const mine = posts.filter((p) => p.name === user.name);
  const savedPosts = posts.filter((p) => saved.includes(p.id));

  const saveProfile = () => {
    setUser({ ...draft, name: draft.name.trim() || user.name });
    setEdit(false);
    notify("Profile updated");
  };

  return (
    <Box flex={1} p={{ xs: 1.5, sm: 2 }} maxWidth={900} mx="auto" width="100%">
      <Card sx={{ overflow: "hidden", mb: 3 }}>
        <Box sx={{ height: { xs: 150, sm: 230 }, background: `url(${cover}) center/cover` }} />
        <Box px={3} pb={3}>
          <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "flex-start", sm: "flex-end" }} justifyContent="space-between" gap={2} mt={-6}>
            <Stack direction="row" alignItems="flex-end" gap={2}>
              <Avatar sx={{ width: 120, height: 120, fontSize: 40, fontWeight: 800, bgcolor: user.color, border: "5px solid", borderColor: "background.paper" }}>
                {initials(user.name)}
              </Avatar>
              <Box pb={1}>
                <Typography variant="h5" fontWeight={800}>{user.name}</Typography>
                <Typography color="text.secondary">{user.handle}</Typography>
              </Box>
            </Stack>
            <Stack direction="row" gap={1}>
              <Button variant="contained" onClick={() => setComposerOpen(true)}>New post</Button>
              <Button variant="outlined" startIcon={<Edit />} onClick={() => { setDraft(user); setEdit(true); }}>Edit profile</Button>
            </Stack>
          </Stack>
          <Typography mt={2}>{user.bio}</Typography>
          <Stack direction="row" gap={2} mt={1} color="text.secondary" flexWrap="wrap">
            <Typography variant="body2" display="flex" alignItems="center" gap={0.5}><LocationOn fontSize="small" />{user.location}</Typography>
            <Typography variant="body2" display="flex" alignItems="center" gap={0.5}><CalendarMonth fontSize="small" />Joined {user.joined}</Typography>
          </Stack>
          <Stack direction="row" gap={4} mt={2}>
            {[[mine.length, "Posts"], [248 + friendsIds.length, "Friends"], ["1.2k", "Followers"]].map(([n, l]) => (
              <Box key={l}>
                <Typography fontWeight={800} fontSize={20}>{n}</Typography>
                <Typography variant="body2" color="text.secondary">{l}</Typography>
              </Box>
            ))}
          </Stack>
        </Box>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ px: 2, borderTop: 1, borderColor: "divider" }}>
          <Tab label="Posts" />
          <Tab label="Photos" />
          <Tab label={`Saved (${savedPosts.length})`} />
        </Tabs>
      </Card>

      <Box maxWidth={680} mx="auto" key={tab} className="page-in">
        {tab === 0 &&
          (mine.length ? (
            mine.map((p, i) => <Post key={p.id} {...p} index={i} />)
          ) : (
            <Empty text="You haven't posted yet." action={<Button variant="contained" onClick={() => setComposerOpen(true)}>Create your first post</Button>} />
          ))}
        {tab === 1 && (
          <ImageList cols={3} gap={10} sx={{ m: 0 }}>
            {photos.map((src) => (
              <ImageListItem key={src} sx={{ borderRadius: 3, overflow: "hidden", "& img": { transition: "transform .6s" }, "&:hover img": { transform: "scale(1.08)" } }}>
                <img src={src} alt="" loading="lazy" style={{ aspectRatio: "1", objectFit: "cover" }} />
              </ImageListItem>
            ))}
          </ImageList>
        )}
        {tab === 2 &&
          (savedPosts.length ? savedPosts.map((p, i) => <Post key={p.id} {...p} index={i} />) : <Empty text="Bookmark posts to find them here later." />)}
      </Box>

      <Dialog open={edit} onClose={() => setEdit(false)} fullWidth maxWidth="sm">
        <DialogTitle fontWeight={700}>Edit profile</DialogTitle>
        <DialogContent sx={{ display: "grid", gap: 2, pt: "8px !important" }}>
          <TextField label="Name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
          <TextField label="Username" value={draft.handle} onChange={(e) => setDraft({ ...draft, handle: e.target.value })} />
          <TextField label="Bio" multiline rows={3} value={draft.bio} onChange={(e) => setDraft({ ...draft, bio: e.target.value })} />
          <TextField label="Location" value={draft.location} onChange={(e) => setDraft({ ...draft, location: e.target.value })} />
          <Stack direction="row" gap={1}>
            {["#1976d2", "#9c27b0", "#e91e63", "#ff9800", "#009688", "#3f51b5"].map((c) => (
              <Box key={c} component="button" onClick={() => setDraft({ ...draft, color: c })} aria-label={`Avatar colour ${c}`}
                sx={{ width: 34, height: 34, borderRadius: "50%", border: 0, cursor: "pointer", bgcolor: c, outline: draft.color === c ? "3px solid" : "none", outlineColor: "text.primary", outlineOffset: 2 }} />
            ))}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setEdit(false)}>Cancel</Button>
          <Button variant="contained" onClick={saveProfile}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export const Empty = ({ text, action }) => (
  <Card sx={{ p: 5, textAlign: "center" }}>
    <Typography color="text.secondary" mb={action ? 2 : 0}>{text}</Typography>
    {action}
  </Card>
);

export default Profile;
