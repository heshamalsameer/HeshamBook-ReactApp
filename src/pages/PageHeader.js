import { Box, Typography } from "@mui/material";

// Shared heading used by every inner page
const PageHeader = ({ icon, title, subtitle, action }) => (
  <Box display="flex" alignItems="center" justifyContent="space-between" gap={2} flexWrap="wrap" mb={3}>
    <Box display="flex" alignItems="center" gap={1.5}>
      {icon && (
        <Box sx={{ width: 48, height: 48, borderRadius: 3, display: "grid", placeItems: "center", bgcolor: "primary.main", color: "#fff" }}>
          {icon}
        </Box>
      )}
      <Box>
        <Typography variant="h5" fontWeight={800} letterSpacing="-0.02em">{title}</Typography>
        {subtitle && <Typography color="text.secondary" variant="body2">{subtitle}</Typography>}
      </Box>
    </Box>
    {action}
  </Box>
);

export default PageHeader;
