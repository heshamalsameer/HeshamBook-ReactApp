import { TrendingUp } from "@mui/icons-material";
import { Card, List, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import { trends } from "../data/Data";

// New: trending tags
const Trending = () => (
  <Card sx={{ p: 2 }}>
    <Stack direction="row" alignItems="center" gap={1} mb={0.5}>
      <TrendingUp color="primary" />
      <Typography variant="subtitle1" fontWeight={700}>Trending now</Typography>
    </Stack>
    <List disablePadding>
      {trends.map((t, i) => (
        <ListItemButton key={t.tag} sx={{ px: 1, py: 0.6 }}>
          <Typography color="text.secondary" fontWeight={700} width={26}>{i + 1}</Typography>
          <ListItemText primary={<Typography fontWeight={600} color="primary">{t.tag}</Typography>} secondary={t.posts} />
        </ListItemButton>
      ))}
    </List>
  </Card>
);

export default Trending;
