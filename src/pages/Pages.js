import { Avatar, Box, Button, Card, Grid, Stack, Typography, Zoom } from "@mui/material";
import { Article, Check, Verified } from "@mui/icons-material";
import PageHeader from "./PageHeader";
import { useApp } from "../context/AppContext";
import { pagesList } from "../data/Data";
import { initials } from "../Components/Navbar";

const Pages = () => {
  const { followedPages, togglePage, notify } = useApp();
  return (
    <Box flex={1} p={{ xs: 1.5, sm: 2 }} maxWidth={1000} mx="auto" width="100%">
      <PageHeader icon={<Article />} title="Pages" subtitle={`Following ${followedPages.length} pages`} />
      <Grid container spacing={2}>
        {pagesList.map((p, i) => {
          const on = followedPages.includes(p.id);
          return (
            <Grid item xs={12} sm={6} key={p.id}>
              <Zoom in style={{ transitionDelay: `${i * 50}ms` }}>
                <Card sx={{ p: 2, display: "flex", alignItems: "center", gap: 2, transition: "box-shadow .3s, transform .3s", "&:hover": { transform: "translateY(-3px)" } }}>
                  <Avatar variant="rounded" sx={{ width: 64, height: 64, bgcolor: p.color, fontWeight: 800, fontSize: 22, borderRadius: 3 }}>{initials(p.name)}</Avatar>
                  <Box flex={1} minWidth={0}>
                    <Stack direction="row" alignItems="center" gap={0.5}>
                      <Typography fontWeight={700} noWrap>{p.name}</Typography>
                      {p.verified && <Verified color="primary" sx={{ fontSize: 18 }} />}
                    </Stack>
                    <Typography variant="body2" color="text.secondary">{p.category} · {p.followers} followers</Typography>
                  </Box>
                  <Button
                    variant={on ? "outlined" : "contained"}
                    startIcon={on ? <Check /> : null}
                    onClick={() => {
                      togglePage(p.id);
                      notify(on ? `Unfollowed ${p.name}` : `Following ${p.name}`);
                    }}
                  >
                    {on ? "Following" : "Follow"}
                  </Button>
                </Card>
              </Zoom>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Pages;
