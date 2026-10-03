import { Card, ImageList, ImageListItem, Typography } from "@mui/material";
import { photos } from "../data/Data";

const Photos = () => (
  <Card sx={{ p: 2 }}>
    <Typography variant="subtitle1" fontWeight={700} mb={1.5}>Latest Photos</Typography>
    <ImageList cols={3} rowHeight={80} gap={8} sx={{ m: 0 }}>
      {photos.map((src, i) => (
        <ImageListItem key={i} sx={{ borderRadius: 2, overflow: "hidden", cursor: "pointer", "& img": { transition: "transform .6s" }, "&:hover img": { transform: "scale(1.12)" } }}>
          <img src={src} alt={`Recent photo ${i + 1}`} loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  </Card>
);

export default Photos;
