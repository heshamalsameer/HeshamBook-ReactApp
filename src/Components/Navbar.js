import { React,useState } from "react";
import { Mail, Notifications, Pets } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  Toolbar,
  Typography,
  styled,
  MenuItem,
  Menu,
} from "@mui/material";

const StyleToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  gap: "20px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const User = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const Navbar = () => {
  const [open, setopen] = useState(false);
  const handleClose = () => setopen(false);
  return (
    <AppBar position="sticky">
      <StyleToolbar>
        <Typography sx={{ display: { xs: "none", sm: "block" } }} variant="h6">
          HESHAM 
        </Typography>
        <Pets sx={{ display: { xs: "block", sm: "none" } }} />
        <Search >
          <InputBase  placeholder="search..." sx={{ width: "100%"}} />
        </Search>
        <Icons>
          <Badge badgeContent={4} color="error">
            <Mail />
          </Badge>
          <Badge badgeContent={2} color="error">
            <Notifications />
          </Badge>
          <Avatar
            sx={{ width: "30px", height: "30px" }}
            src="https://randomuser.me/api/portraits/men/51.jpg"
            onClick={() => setopen(true)}
          />
        </Icons>
        <User>
          <Avatar
            sx={{ width: "30px", height: "30px" }}
            src="https://randomuser.me/api/portraits/men/51.jpg"
            onClick={() => setopen(true)}
          />
          <Typography variant="h6">Hesham</Typography>
        </User>
      </StyleToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
