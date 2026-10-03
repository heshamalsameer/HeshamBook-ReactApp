import { Add } from "@mui/icons-material";
import { Box, Card, Typography } from "@mui/material";
import { stories } from "../data/Data";

// Horizontal stories strip (new section)
const Stories = ({ onCompose }) => (
  <Box
    sx={{
      display: "flex",
      gap: 1.5,
      overflowX: "auto",
      pb: 1,
      mb: 2,
      scrollSnapType: "x mandatory",
      "&::-webkit-scrollbar": { display: "none" },
      scrollbarWidth: "none",
    }}
  >
    <Card
      onClick={onCompose}
      sx={{
        flex: "0 0 112px",
        height: 180,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        cursor: "pointer",
        scrollSnapAlign: "start",
        transition: "transform .3s",
        "&:hover": { transform: "translateY(-4px)" },
      }}
    >
      <Box sx={{ width: 44, height: 44, borderRadius: "50%", bgcolor: "primary.main", color: "#fff", display: "grid", placeItems: "center" }}>
        <Add />
      </Box>
      <Typography variant="body2" fontWeight={600}>Your story</Typography>
    </Card>
    {stories.map((s, i) => (
      <Card
        key={s.name}
        className="rise"
        style={{ animationDelay: `${i * 70}ms` }}
        sx={{
          position: "relative",
          flex: "0 0 112px",
          height: 180,
          cursor: "pointer",
          scrollSnapAlign: "start",
          overflow: "hidden",
          "& img": { transition: "transform .8s cubic-bezier(.22,1,.36,1)" },
          "&:hover img": { transform: "scale(1.1)" },
        }}
      >
        <img src={s.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 45%, rgba(0,0,0,.65))" }} />
        <Box
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            width: 38,
            height: 38,
            borderRadius: "50%",
            p: "3px",
            background: "conic-gradient(#1976d2, #9c27b0, #ff9800, #1976d2)",
          }}
        >
          <Box sx={{ width: "100%", height: "100%", borderRadius: "50%", bgcolor: s.color, color: "#fff", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 13, border: "2px solid #fff" }}>
            {s.name[0]}
          </Box>
        </Box>
        <Typography variant="body2" fontWeight={600} sx={{ position: "absolute", left: 10, bottom: 10, color: "#fff" }}>
          {s.name}
        </Typography>
      </Card>
    ))}
  </Box>
);

export default Stories;
