import { Box, Card, Skeleton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Post from "./Post";
import Stories from "./Stories";
import Composer from "./Composer";

const PostSkeleton = () => (
  <Card sx={{ p: 2, mb: 3 }}>
    <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
      <Skeleton variant="circular" width={40} height={40} animation="wave" />
      <Box flex={1}>
        <Skeleton width="40%" animation="wave" />
        <Skeleton width="25%" animation="wave" />
      </Box>
    </Stack>
    <Skeleton width="90%" animation="wave" />
    <Skeleton width="70%" animation="wave" sx={{ mb: 2 }} />
    <Skeleton variant="rounded" height={320} animation="wave" />
  </Card>
);

const Feed = ({ posts, query, onCompose }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <Box flex={4} p={{ xs: 1.5, sm: 2 }} maxWidth={680} mx="auto" width="100%">
      {!query && <Stories onCompose={onCompose} />}
      {!query && <Composer onCompose={onCompose} />}
      {loading ? (
        <>
          <PostSkeleton />
          <PostSkeleton />
        </>
      ) : posts.length ? (
        posts.map((post, i) => <Post key={post.id} {...post} index={i} />)
      ) : (
        <Card sx={{ p: 5, textAlign: "center" }}>
          <Typography variant="h6">No results for “{query}”</Typography>
          <Typography color="text.secondary">Try another name or keyword.</Typography>
        </Card>
      )}
    </Box>
  );
};

export default Feed;
