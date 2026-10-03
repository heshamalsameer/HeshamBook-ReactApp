import { useMemo, useState } from "react";
import {
  Badge, Box, Button, Card, CardContent, CardMedia, Chip, Divider, Drawer, Fab, Grid, IconButton, MenuItem, Rating, Stack, TextField, Typography, Grow,
} from "@mui/material";
import { Add, Close, Delete, Remove, ShoppingCart, Storefront, FavoriteBorder, Favorite } from "@mui/icons-material";
import PageHeader from "./PageHeader";
import { Empty } from "./Profile";
import { useApp } from "../context/AppContext";
import { products } from "../data/Data";

const cats = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

const Marketplace = () => {
  const { cart, setCart, addToCart, notify } = useApp();
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("popular");
  const [open, setOpen] = useState(false);
  const [wish, setWish] = useState([]);

  const list = useMemo(() => {
    let l = products.filter((p) => cat === "All" || p.category === cat);
    if (sort === "low") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "high") l = [...l].sort((a, b) => b.price - a.price);
    if (sort === "rating") l = [...l].sort((a, b) => b.rating - a.rating);
    return l;
  }, [cat, sort]);

  const items = cart.map((c) => ({ ...products.find((p) => p.id === c.id), qty: c.qty })).filter((x) => x.title);
  const count = items.reduce((n, x) => n + x.qty, 0);
  const total = items.reduce((n, x) => n + x.qty * x.price, 0);
  const setQty = (id, d) =>
    setCart((c) => c.map((x) => (x.id === id ? { ...x, qty: x.qty + d } : x)).filter((x) => x.qty > 0));

  return (
    <Box flex={1} p={{ xs: 1.5, sm: 2 }} maxWidth={1100} mx="auto" width="100%">
      <PageHeader
        icon={<Storefront />}
        title="Marketplace"
        subtitle="Prints, merch and goodies made by your friends"
        action={
          <Button variant="contained" onClick={() => setOpen(true)} startIcon={<Badge badgeContent={count} color="error"><ShoppingCart /></Badge>}>
            Cart
          </Button>
        }
      />
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" gap={2} mb={3}>
        <Stack direction="row" gap={1} sx={{ overflowX: "auto" }}>
          {cats.map((c) => (
            <Chip key={c} label={c} onClick={() => setCat(c)} color={cat === c ? "primary" : "default"} variant={cat === c ? "filled" : "outlined"} />
          ))}
        </Stack>
        <TextField select size="small" value={sort} onChange={(e) => setSort(e.target.value)} sx={{ minWidth: 180 }}>
          <MenuItem value="popular">Most popular</MenuItem>
          <MenuItem value="rating">Top rated</MenuItem>
          <MenuItem value="low">Price: low to high</MenuItem>
          <MenuItem value="high">Price: high to low</MenuItem>
        </TextField>
      </Stack>

      <Grid container spacing={2.5} key={cat + sort}>
        {list.map((p, i) => {
          const liked = wish.includes(p.id);
          return (
            <Grid item xs={6} md={4} key={p.id}>
              <Grow in style={{ transformOrigin: "50% 0", transitionDelay: `${i * 50}ms` }}>
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column", position: "relative", "&:hover img": { transform: "scale(1.07)" } }}>
                  <IconButton
                    onClick={() => setWish((w) => (liked ? w.filter((x) => x !== p.id) : [...w, p.id]))}
                    sx={{ position: "absolute", top: 10, right: 10, zIndex: 1, bgcolor: "rgba(255,255,255,.9)", "&:hover": { bgcolor: "#fff" } }}
                    aria-label="wishlist"
                  >
                    {liked ? <Favorite color="error" className="pop" /> : <FavoriteBorder sx={{ color: "#333" }} />}
                  </IconButton>
                  <Box overflow="hidden">
                    <CardMedia component="img" image={p.image} alt={p.title} sx={{ aspectRatio: "4 / 3", transition: "transform .8s cubic-bezier(.22,1,.36,1)" }} />
                  </Box>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography fontWeight={800} fontSize={20} color="primary">${p.price}</Typography>
                    <Typography fontWeight={600}>{p.title}</Typography>
                    <Typography variant="body2" color="text.secondary">by {p.seller}</Typography>
                    <Rating value={p.rating} precision={0.1} readOnly size="small" sx={{ mt: 0.5 }} />
                  </CardContent>
                  <Box p={2} pt={0}>
                    <Button fullWidth variant="contained" startIcon={<ShoppingCart />} onClick={() => addToCart(p)}>Add to cart</Button>
                  </Box>
                </Card>
              </Grow>
            </Grid>
          );
        })}
      </Grid>

      <Fab color="primary" onClick={() => setOpen(true)} sx={{ position: "fixed", right: 24, bottom: { xs: 84, md: 28 } }} aria-label="open cart">
        <Badge badgeContent={count} color="error"><ShoppingCart /></Badge>
      </Fab>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { width: { xs: "100%", sm: 400 }, p: 3 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Your cart ({count})</Typography>
          <IconButton onClick={() => setOpen(false)}><Close /></IconButton>
        </Stack>
        {items.length === 0 ? (
          <Empty text="Your cart is empty." />
        ) : (
          <>
            <Stack gap={2} flex={1} overflow="auto">
              {items.map((x) => (
                <Stack key={x.id} direction="row" gap={2} alignItems="center" className="rise">
                  <Box component="img" src={x.image} alt="" sx={{ width: 72, height: 72, borderRadius: 2, objectFit: "cover" }} />
                  <Box flex={1} minWidth={0}>
                    <Typography fontWeight={600} noWrap>{x.title}</Typography>
                    <Typography color="text.secondary" variant="body2">${x.price}</Typography>
                    <Stack direction="row" alignItems="center" gap={1} mt={0.5}>
                      <IconButton size="small" onClick={() => setQty(x.id, -1)}><Remove fontSize="small" /></IconButton>
                      <Typography fontWeight={700}>{x.qty}</Typography>
                      <IconButton size="small" onClick={() => setQty(x.id, 1)}><Add fontSize="small" /></IconButton>
                    </Stack>
                  </Box>
                  <IconButton onClick={() => setQty(x.id, -x.qty)} aria-label="remove"><Delete /></IconButton>
                </Stack>
              ))}
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Stack direction="row" justifyContent="space-between" mb={2}>
              <Typography fontWeight={600}>Total</Typography>
              <Typography fontWeight={800} fontSize={20}>${total.toFixed(2)}</Typography>
            </Stack>
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                setCart([]);
                setOpen(false);
                notify("Order placed — thank you! 🛍️");
              }}
            >
              Checkout
            </Button>
          </>
        )}
      </Drawer>
    </Box>
  );
};

export default Marketplace;
