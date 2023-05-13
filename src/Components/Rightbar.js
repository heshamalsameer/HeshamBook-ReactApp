import React from "react";
import Friends from './Friends';
import Photos from './Photos';
import Conversations from "./Conversations";
import {
  Box
} from "@mui/material";
const Rightbar = () => {
  return (
    <Box sx={{ display: { xs: "none", sm: "block" } }} flex={2} p={2} pr={0}>
      <Box position={"fixed"} width={350}>
        <Friends/>
        <Photos/>
        <Conversations/>
      </Box>
    </Box>
  );
};

export default Rightbar;
