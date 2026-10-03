import { useState } from "react";
import { Box, Button, Card, CardContent, CardMedia, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Stack, TextField, Typography, Grow } from "@mui/material";
import { Add, Check, Group } from "@mui/icons-material";
import PageHeader from "./PageHeader";
import { useApp } from "../context/AppContext";
import { groups as seed } from "../data/Data";

const cats = ["All", "Joined", "Art", "Tech", "Design", "Outdoors", "Lifestyle"];
const fmt = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n);

const Groups = () => {
  const { joinedGroups, toggleGroup, notify } = useApp();
  const [groups, setGroups] = useState(seed);
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", category: "Art", desc: "" });

  const list = groups.filter((g) => (cat === "All" ? true : cat === "Joined" ? joinedGroups.includes(g.id) : g.category === cat));

  const create = () => {
    if (!form.name.trim()) return;
    const g = { id: `g${Date.now()}`, ...form, members: 1, image: seed[groups.length % seed.length].image };
    setGroups((x) => [g, ...x]);
    toggleGroup(g.id);
    setOpen(false);
    setForm({ name: "", category: "Art", desc: "" });
    notify(`Group “${g.name}” created`);
  };

  return (
    <Box flex={1} p={{ xs: 1.5, sm: 2 }} maxWidth={1000} mx="auto" width="100%">
      <PageHeader
        icon={<Group />}
        title="Groups"
        subtitle={`You're in ${joinedGroups.length} groups`}
        action={<Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>Create group</Button>}
      />
      <Stack direction="row" gap={1} mb={3} sx={{ overflowX: "auto", pb: 1 }}>
        {cats.map((c) => (
          <Chip key={c} label={c} onClick={() => setCat(c)} color={cat === c ? "primary" : "default"} variant={cat === c ? "filled" : "outlined"} />
        ))}
      </Stack>
      <Grid container spacing={2.5}>
        {list.map((g, i) => {
          const joined = joinedGroups.includes(g.id);
          return (
            <Grid item xs={12} sm={6} md={4} key={g.id}>
              <Grow in style={{ transformOrigin: "50% 0", transitionDelay: `${i * 50}ms` }}>
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column", transition: "transform .3s", "&:hover": { transform: "translateY(-4px)" } }}>
                  <CardMedia component="img" height="130" image={g.image} alt="" />
                  <CardContent sx={{ flex: 1 }}>
                    <Chip size="small" label={g.category} sx={{ mb: 1 }} />
                    <Typography fontWeight={700} fontSize={18}>{g.name}</Typography>
                    <Typography variant="body2" color="text.secondary" mb={1}>{fmt(g.members + (joined ? 1 : 0))} members</Typography>
                    <Typography variant="body2">{g.desc}</Typography>
                  </CardContent>
                  <Box p={2} pt={0}>
                    <Button
                      fullWidth
                      variant={joined ? "outlined" : "contained"}
                      startIcon={joined ? <Check /> : <Add />}
                      onClick={() => {
                        toggleGroup(g.id);
                        notify(joined ? `Left ${g.name}` : `Joined ${g.name} 🎉`);
                      }}
                    >
                      {joined ? "Joined" : "Join group"}
                    </Button>
                  </Box>
                </Card>
              </Grow>
            </Grid>
          );
        })}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle fontWeight={700}>Create a group</DialogTitle>
        <DialogContent sx={{ display: "grid", gap: 2, pt: "8px !important" }}>
          <TextField label="Group name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoFocus />
          <TextField select label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {cats.slice(2).map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </TextField>
          <TextField label="Description" multiline rows={3} value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={create} disabled={!form.name.trim()}>Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Groups;
