import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => (
  <Box flex={1} p={4} textAlign="center" mt={8}>
    <Typography fontSize={96} fontWeight={900} color="primary" lineHeight={1}>404</Typography>
    <Typography variant="h6" mt={1}>This page wandered off</Typography>
    <Typography color="text.secondary" mb={3}>The link may be broken or the page may have been removed.</Typography>
    <Button component={Link} to="/" variant="contained">Back to home</Button>
  </Box>
);

export default NotFound;
