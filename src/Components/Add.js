import {
  Add as AddIcon,
  DateRange,
  EmojiEmotions,
  Image,
  PersonAdd,
  VideoCameraBack,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Fab,
  Modal,
  Stack,
  TextField,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";

const StyledModel = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const BoxModal = styled(Box)({
  width: "500px",
  height: "325px",
  borderRadius: "20px",
  padding: "30px",
  backgroundColor:'background.default',
  color:'text.primary'
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});

const Add = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return (
    <>
      <Tooltip
        onClick={handleOpen}
        arrow
        title="Add"
        sx={{
          position: "fixed",
          bottom: { xs: 75, md: 20 },
          left: { xs: "75%", md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>

      <StyledModel
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <BoxModal bgcolor='background.default' color='text.primary'>
          <Typography variant="h6" color={"gray"} textAlign={"center"}>
            Create Post
          </Typography>
          <UserBox>
            <Avatar src="https://material-ui.com/static/images/avatar/2.jpg" />
            <Typography fontWeight={500}>Hesham</Typography>
          </UserBox>
          <TextField
            multiline
            rows={3}
            placeholder="What's on your mind?"
            variant="standard"
            sx={{ width: "100%" }}
          />
          <Stack direction={"row"} spacing={1} mt={2} mb={3}>
            <EmojiEmotions color="primary" />
            <Image color="secondary" />
            <VideoCameraBack color="success" />
            <PersonAdd color="error" />
          </Stack>
          <ButtonGroup fullWidth variant="contained">
            <Button>Post</Button>
            <Button sx={{ width: "100px" }}>
              <DateRange />
            </Button>
          </ButtonGroup>
        </BoxModal>
      </StyledModel>
    </>
  );
};

export default Add;
