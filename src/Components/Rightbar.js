import { Box, Stack, Typography } from "@mui/material";
import Friends from "./Friends";
import Photos from "./Photos";
import Conversations from "./Conversations";
import Trending from "./Trending";

const Rightbar = () => (
  <Box sx={{ display: { xs: "none", lg: "block" } }} flex={2} p={2} pr={0} maxWidth={360}>
    <Stack spacing={2} position="sticky" top={80}>
      <Friends />
      <Trending />
      <Photos />
      <Conversations />
      <Typography variant="caption" color="text.secondary" px={1}>
        Privacy · Terms · Advertising · © {new Date().getFullYear()} Circle
      </Typography>
    </Stack>
  </Box>
);

export default Rightbar;
