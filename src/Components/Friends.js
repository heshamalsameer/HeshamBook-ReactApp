import { Avatar, AvatarGroup, Badge, Card, Stack, Typography, styled } from "@mui/material";
import { friends } from "../data/Data";
import { initials } from "./Navbar";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";

const Online = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      inset: 0,
      borderRadius: "50%",
      animation: "ripple 1.4s infinite ease-in-out",
      border: "1px solid #44b700",
      content: '""',
    },
  },
  "@keyframes ripple": {
    from: { transform: "scale(.8)", opacity: 1 },
    to: { transform: "scale(2.4)", opacity: 0 },
  },
}));

const Friends = () => (
  <Card sx={{ p: 2 }}>
    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
      <Typography variant="subtitle1" fontWeight={700}>Online Friends</Typography>
      <Link component={RouterLink} to="/friends" variant="body2" fontWeight={600} underline="hover">See all</Link>
    </Stack>
    <AvatarGroup max={7} sx={{ justifyContent: "flex-start" }}>
      {friends.map((f) => (
        <Online key={f.name} overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant="dot">
          <Avatar alt={f.name} sx={{ bgcolor: f.color, fontSize: 14, fontWeight: 700 }}>{initials(f.name)}</Avatar>
        </Online>
      ))}
    </AvatarGroup>
  </Card>
);

export default Friends;
