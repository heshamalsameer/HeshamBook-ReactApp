import aurora from "../assets/posts/aurora.jpg";
import orbit from "../assets/posts/orbit.jpg";
import dusk from "../assets/posts/dusk.jpg";
import grid from "../assets/posts/grid.jpg";
import candy from "../assets/posts/candy.jpg";
import neon from "../assets/posts/neon.jpg";

// The signed-in (demo) user
export const currentUser = { name: "Layla Haddad", handle: "@layla", color: "#1976d2" };

// Sample feed — swap with your API later
export const MenuList = [
  {
    id: 1,
    name: "Ahmed Jaghal",
    color: "#e91e63",
    sub: "2 hours ago",
    description: "Finally finished my new wallpaper series 🌊 Soft waves, warm sunsets — which one should I print first?",
    image: aurora,
    likes: 128,
    comments: [
      { by: "Taha Baraze", text: "The colours are unreal 🔥" },
      { by: "Guijrate", text: "Print this one, 100%." },
    ],
  },
  {
    id: 2,
    name: "Ahmed Hesso",
    color: "#9c27b0",
    sub: "5 hours ago",
    description: "Late-night design session. Sometimes one circle is all a layout needs.",
    image: orbit,
    likes: 86,
    comments: [{ by: "Ebraheem Masree", text: "Minimal and clean 👌" }],
  },
  {
    id: 3,
    name: "Taha Baraze",
    color: "#ff9800",
    sub: "Yesterday",
    description: "Weekend hike → sketchbook → this. Nothing beats mountain silence at dusk.",
    image: dusk,
    likes: 214,
    comments: [],
  },
  {
    id: 4,
    name: "Ebraheem Masree",
    color: "#009688",
    sub: "Yesterday",
    description: "Building a new icon set for our app. Rounded or outlined — vote in the comments!",
    image: grid,
    likes: 57,
    comments: [{ by: "Ahmed Jaghal", text: "Rounded, always rounded." }],
  },
  {
    id: 5,
    name: "Guijrate",
    color: "#3f51b5",
    sub: "2 days ago",
    description: "Monday mood: cotton-candy gradients and a big cup of coffee ☕",
    image: candy,
    likes: 173,
    comments: [],
  },
  {
    id: 6,
    name: "Sara Nour",
    color: "#f44336",
    sub: "3 days ago",
    description: "Retro stripes are back. Made this poster for a friend's music night 🎶",
    image: neon,
    likes: 92,
    comments: [],
  },
];

export const stories = [
  { name: "Ahmed", color: "#e91e63", image: aurora },
  { name: "Taha", color: "#ff9800", image: dusk },
  { name: "Ebraheem", color: "#009688", image: grid },
  { name: "Sara", color: "#f44336", image: neon },
  { name: "Guijrate", color: "#3f51b5", image: candy },
];

export const friends = [
  { name: "Remy Sharp", color: "#e91e63" },
  { name: "Travis Howard", color: "#673ab7" },
  { name: "Cindy Baker", color: "#009688" },
  { name: "Agnes Walker", color: "#ff9800" },
  { name: "Trevor Henderson", color: "#3f51b5" },
  { name: "Mona Saleh", color: "#4caf50" },
  { name: "Omar Fares", color: "#795548" },
  { name: "Nadia Karam", color: "#00bcd4" },
];

export const photos = [aurora, dusk, grid, candy, neon, orbit];

export const conversations = [
  { from: "Ali Connors", color: "#ff5722", title: "Brunch this weekend?", text: "I'll be in your neighborhood doing errands this…", time: "10m" },
  { from: "Scott, Alex, Jennifer", color: "#2196f3", title: "Summer BBQ", text: "Wish I could come, but I'm out of town this…", time: "1h" },
  { from: "Sandra Adams", color: "#8bc34a", title: "Oui Oui", text: "Do you have Paris recommendations? Have you ever…", time: "3h" },
];

export const trends = [
  { tag: "#DesignWeek", posts: "12.4k posts" },
  { tag: "#Generative", posts: "8.1k posts" },
  { tag: "#WeekendHike", posts: "5.6k posts" },
  { tag: "#ReactJS", posts: "3.9k posts" },
];

/* ---------- data for the extra pages ---------- */
export const friendRequests = [
  { id: "r1", name: "Yara Mansour", color: "#ab47bc", mutual: 12 },
  { id: "r2", name: "Karim Aziz", color: "#26a69a", mutual: 4 },
  { id: "r3", name: "Dana Fawaz", color: "#ef5350", mutual: 7 },
];

export const suggestions = [
  { id: "s1", name: "Hadi Salem", color: "#5c6bc0", mutual: 9, role: "Product designer" },
  { id: "s2", name: "Rana Khoury", color: "#ffa726", mutual: 3, role: "Photographer" },
  { id: "s3", name: "Faisal Odeh", color: "#66bb6a", mutual: 15, role: "Frontend dev" },
  { id: "s4", name: "Lama Darwish", color: "#ec407a", mutual: 6, role: "Illustrator" },
  { id: "s5", name: "Zaid Nasser", color: "#8d6e63", mutual: 2, role: "Hiker & writer" },
  { id: "s6", name: "Maya Hamdan", color: "#29b6f6", mutual: 11, role: "UX researcher" },
];

export const groups = [
  { id: "g1", name: "Gradient Lovers", members: 12400, image: aurora, category: "Art", desc: "Share colour palettes, wallpapers and generative art." },
  { id: "g2", name: "React Developers", members: 58200, image: orbit, category: "Tech", desc: "Hooks, tips and help for React and Vite projects." },
  { id: "g3", name: "Weekend Hikers", members: 8300, image: dusk, category: "Outdoors", desc: "Trails, gear and sunset photos every weekend." },
  { id: "g4", name: "UI Icon Makers", members: 4100, image: grid, category: "Design", desc: "Icon sets, grids and feedback on your work." },
  { id: "g5", name: "Coffee & Pastels", members: 2700, image: candy, category: "Lifestyle", desc: "Cosy cafés, latte art and soft colours." },
  { id: "g6", name: "Retro Posters", members: 9600, image: neon, category: "Art", desc: "Gig posters, stripes and everything 80s." },
];

export const pagesList = [
  { id: "p1", name: "Circle Design", followers: "120k", category: "Product", color: "#1976d2", verified: true },
  { id: "p2", name: "Daily Gradients", followers: "48k", category: "Art", color: "#9c27b0", verified: true },
  { id: "p3", name: "Code & Coffee", followers: "31k", category: "Tech", color: "#795548" },
  { id: "p4", name: "Trail Stories", followers: "22k", category: "Outdoors", color: "#2e7d32" },
  { id: "p5", name: "Kuwait Creatives", followers: "15k", category: "Community", color: "#ef6c00" },
  { id: "p6", name: "Minimal Living", followers: "9.8k", category: "Lifestyle", color: "#455a64" },
];

export const products = [
  { id: "m1", title: "Aurora Wave Print", price: 24, category: "Prints", image: aurora, seller: "Ahmed Jaghal", rating: 4.8 },
  { id: "m2", title: "Orbit Poster A2", price: 32, category: "Prints", image: orbit, seller: "Ahmed Hesso", rating: 4.6 },
  { id: "m3", title: "Dusk Mountains Canvas", price: 58, category: "Canvas", image: dusk, seller: "Taha Baraze", rating: 4.9 },
  { id: "m4", title: "Icon Grid Sticker Pack", price: 9, category: "Stickers", image: grid, seller: "Ebraheem Masree", rating: 4.5 },
  { id: "m5", title: "Candy Gradient Mug", price: 15, category: "Merch", image: candy, seller: "Guijrate", rating: 4.7 },
  { id: "m6", title: "Neon Stripes Tote", price: 19, category: "Merch", image: neon, seller: "Sara Nour", rating: 4.4 },
];

export const notificationsSeed = [
  { id: "n1", type: "like", who: "Taha Baraze", color: "#ff9800", text: "liked your photo.", time: "2m", read: false },
  { id: "n2", type: "comment", who: "Ahmed Jaghal", color: "#e91e63", text: "commented: “Love this palette!”", time: "18m", read: false },
  { id: "n3", type: "friend", who: "Yara Mansour", color: "#ab47bc", text: "sent you a friend request.", time: "1h", read: false },
  { id: "n4", type: "group", who: "React Developers", color: "#1976d2", text: "has 5 new posts you might like.", time: "3h", read: true },
  { id: "n5", type: "birthday", who: "Sara Nour", color: "#f44336", text: "has a birthday today 🎂", time: "8h", read: true },
  { id: "n6", type: "like", who: "Guijrate", color: "#3f51b5", text: "and 12 others liked your post.", time: "1d", read: true },
];

export const threadsSeed = [
  {
    id: "t1",
    name: "Ali Connors",
    color: "#ff5722",
    online: true,
    messages: [
      { from: "them", text: "Brunch this weekend?", time: "10:02" },
      { from: "them", text: "I'll be in your neighborhood doing errands 🙂", time: "10:03" },
    ],
  },
  {
    id: "t2",
    name: "Sandra Adams",
    color: "#8bc34a",
    online: false,
    messages: [
      { from: "them", text: "Do you have Paris recommendations?", time: "Yesterday" },
      { from: "me", text: "Yes! Le Marais for food, Montmartre for sunset.", time: "Yesterday" },
    ],
  },
  {
    id: "t3",
    name: "Taha Baraze",
    color: "#ff9800",
    online: true,
    messages: [{ from: "them", text: "Sending you the hike photos tonight 🏔️", time: "Mon" }],
  },
];
