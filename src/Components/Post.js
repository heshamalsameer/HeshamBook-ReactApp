import React from "react";
import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
const Post = (props) => {
  return (
    <Card sx={{ marginBottom: 5 }}>
      <CardHeader
        avatar={<Avatar sx={{ backgroundColor: "red" }}>R</Avatar>}
        action={
          <IconButton aria-label="setting">
            <MoreVert />
          </IconButton>
        }
        title={props.name}
        subheader={props.sub}
      />
      <CardMedia
        component="img"
        height="450"
        image={props.image}
        alt={props.name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: "red" }} />}
          />
        </IconButton>
        <IconButton>
          <Share />
        </IconButton>
        <IconButton>
          <ChatBubbleOutlineOutlinedIcon />
        </IconButton>
        <Link variant="body1" sx={{ color: "text.primary" }}>5 comment</Link>
      </CardActions>
    </Card>
  );
};

export default Post;
