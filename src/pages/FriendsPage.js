import { useState } from "react";
import { Avatar, Box, Button, Card, Grid, InputBase, Stack, Tab, Tabs, Typography, Zoom } from "@mui/material";
import { Check, Close, People, PersonAdd, PersonRemove, Search } from "@mui/icons-material";
import PageHeader from "./PageHeader";
import { Empty } from "./Profile";
import { initials } from "../Components/Navbar";
import { useApp } from "../context/AppContext";
import { friendRequests, friends as baseFriends, suggestions } from "../data/Data";

const PersonCard = ({ p, subtitle, actions, i }) => (
  <Zoom in style={{ transitionDelay: `${i * 40}ms` }}>
    <Card sx={{ p: 2.5, textAlign: "center", height: "100%", transition: "transform .3s", "&:hover": { transform: "translateY(-4px)" } }}>
      <Avatar sx={{ width: 72, height: 72, mx: "auto", mb: 1.5, bgcolor: p.color, fontSize: 24, fontWeight: 800 }}>{initials(p.name)}</Avatar>
      <Typography fontWeight={700}>{p.name}</Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>{subtitle}</Typography>
      <Stack direction="row" gap={1} justifyContent="center">{actions}</Stack>
    </Card>
  </Zoom>
);

const FriendsPage = () => {
  const { friendsIds, toggleFriend, notify } = useApp();
  const [tab, setTab] = useState(0);
  const [q, setQ] = useState("");
  const [requests, setRequests] = useState(friendRequests);
  const [accepted, setAccepted] = useState([]);

  const all = [...accepted, ...suggestions.filter((s) => friendsIds.includes(s.id)), ...baseFriends.map((f, i) => ({ ...f, id: `f${i}` }))];
  const match = (p) => p.name.toLowerCase().includes(q.toLowerCase());

  const accept = (r) => {
    setRequests((x) => x.filter((y) => y.id !== r.id));
    setAccepted((a) => [r, ...a]);
    notify(`You and ${r.name} are now friends`);
  };
  const decline = (r) => setRequests((x) => x.filter((y) => y.id !== r.id));

  return (
    <Box flex={1} p={{ xs: 1.5, sm: 2 }} maxWidth={1000} mx="auto" width="100%">
      <PageHeader icon={<People />} title="Friends" subtitle={`${all.length} friends · ${requests.length} requests`} />
      <Card sx={{ mb: 3, px: 2 }}>
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "center" }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)}>
            <Tab label="All friends" />
            <Tab label={`Requests (${requests.length})`} />
            <Tab label="Suggestions" />
          </Tabs>
          <Stack direction="row" alignItems="center" gap={1} sx={{ bgcolor: "action.hover", borderRadius: 999, px: 2, py: 0.5, my: { xs: 1.5, sm: 0 } }}>
            <Search fontSize="small" />
            <InputBase placeholder="Search friends" value={q} onChange={(e) => setQ(e.target.value)} />
          </Stack>
        </Stack>
      </Card>

      <Grid container spacing={2}>
        {tab === 0 &&
          all.filter(match).map((p, i) => (
            <Grid item xs={6} sm={4} md={3} key={p.id}>
              <PersonCard p={p} i={i} subtitle={p.role || "Friend"} actions={<Button size="small" variant="outlined">Message</Button>} />
            </Grid>
          ))}
        {tab === 1 &&
          requests.filter(match).map((r, i) => (
            <Grid item xs={6} sm={4} md={3} key={r.id}>
              <PersonCard
                p={r}
                i={i}
                subtitle={`${r.mutual} mutual friends`}
                actions={
                  <>
                    <Button size="small" variant="contained" startIcon={<Check />} onClick={() => accept(r)}>Accept</Button>
                    <Button size="small" color="inherit" onClick={() => decline(r)} aria-label="decline"><Close /></Button>
                  </>
                }
              />
            </Grid>
          ))}
        {tab === 2 &&
          suggestions.filter(match).map((s, i) => {
            const added = friendsIds.includes(s.id);
            return (
              <Grid item xs={6} sm={4} md={3} key={s.id}>
                <PersonCard
                  p={s}
                  i={i}
                  subtitle={`${s.role} · ${s.mutual} mutual`}
                  actions={
                    <Button
                      size="small"
                      variant={added ? "outlined" : "contained"}
                      color={added ? "inherit" : "primary"}
                      startIcon={added ? <PersonRemove /> : <PersonAdd />}
                      onClick={() => {
                        toggleFriend(s.id);
                        notify(added ? `Removed ${s.name}` : `Friend request sent to ${s.name}`);
                      }}
                    >
                      {added ? "Remove" : "Add friend"}
                    </Button>
                  }
                />
              </Grid>
            );
          })}
      </Grid>
      {tab === 1 && requests.length === 0 && <Empty text="No pending requests — you're all caught up 🎉" />}
    </Box>
  );
};

export default FriendsPage;
