import { Box, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import { MenuList } from "../data/Data";
const Feed = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  return (
    <Box flex={4} p={2}>
      {loading ? (
        <>
          <Skeleton
            sx={{ borderRadius: "10px" }}
            variant="rectangular"
            width={"100%"}
            height={60}
            animation="wave"
          />
          <Skeleton
            variant="text"
            width={"100%"}
            animation="wave"
            sx={{ mt: "30px" }}
          />
          <Skeleton
            variant="text"
            width={"100%"}
            animation="wave"
            sx={{ mt: "5px", mb: "7px" }}
          />
          <Skeleton
            variant="rectangular"
            width={"100%"}
            height={400}
            animation="wave"
          />
        </>
      ) : (
        MenuList.map((user) => {
          return <Post key={user.id} {...user} />;
        })
      )}
    </Box>
  );
};

export default Feed;
