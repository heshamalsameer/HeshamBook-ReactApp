import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { MenuList, currentUser as seedUser, notificationsSeed, threadsSeed } from "../data/Data";

const AppContext = createContext(null);

const load = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
};
const usePersisted = (key, fallback) => {
  const [v, setV] = useState(() => load(key, fallback));
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(v));
    } catch {
      /* ignore */
    }
  }, [key, v]);
  return [v, setV];
};

export const AppProvider = ({ children }) => {
  const [mode, setMode] = usePersisted(
    "circle-mode",
    window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );
  const [user, setUser] = usePersisted("circle-user", {
    ...seedUser,
    bio: "Designer · coffee lover · sharing colours every day ✨",
    location: "Kuwait City",
    joined: "March 2023",
  });
  const [posts, setPosts] = useState(MenuList);
  const [saved, setSaved] = usePersisted("circle-saved", []);
  const [friendsIds, setFriendsIds] = usePersisted("circle-friends", []);
  const [joinedGroups, setJoinedGroups] = usePersisted("circle-groups", ["g2"]);
  const [followedPages, setFollowedPages] = usePersisted("circle-pages", ["p1"]);
  const [cart, setCart] = usePersisted("circle-cart", []);
  const [notifications, setNotifications] = useState(notificationsSeed);
  const [threads, setThreads] = useState(threadsSeed);
  const [prefs, setPrefs] = usePersisted("circle-prefs", { email: true, push: true, sounds: false, privateAccount: false });
  const [toast, setToast] = useState("");
  const [composerOpen, setComposerOpen] = useState(false);
  const [query, setQuery] = useState("");

  const toggleIn = (setter) => (id) => setter((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));

  const addPost = useCallback(
    (p) => {
      setPosts((list) => [p, ...list]);
      setToast("Your post is live 🎉");
    },
    []
  );

  const addToCart = (product) => {
    setCart((c) => {
      const hit = c.find((x) => x.id === product.id);
      return hit ? c.map((x) => (x.id === product.id ? { ...x, qty: x.qty + 1 } : x)) : [...c, { id: product.id, qty: 1 }];
    });
    setToast(`${product.title} added to cart`);
  };

  const sendMessage = (threadId, text) => {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setThreads((ts) => ts.map((t) => (t.id === threadId ? { ...t, messages: [...t.messages, { from: "me", text, time }] } : t)));
  };
  const receiveMessage = (threadId, text) => {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setThreads((ts) =>
      ts.map((t) => (t.id === threadId ? { ...t, unread: (t.unread || 0) + 0, messages: [...t.messages, { from: "them", text, time }] } : t))
    );
  };

  const value = useMemo(
    () => ({
      mode,
      setMode,
      toggleMode: () => setMode((m) => (m === "light" ? "dark" : "light")),
      user,
      setUser,
      posts,
      setPosts,
      addPost,
      saved,
      toggleSaved: toggleIn(setSaved),
      friendsIds,
      toggleFriend: toggleIn(setFriendsIds),
      joinedGroups,
      toggleGroup: toggleIn(setJoinedGroups),
      followedPages,
      togglePage: toggleIn(setFollowedPages),
      cart,
      setCart,
      addToCart,
      notifications,
      setNotifications,
      unreadCount: notifications.filter((n) => !n.read).length,
      threads,
      sendMessage,
      receiveMessage,
      prefs,
      setPrefs,
      toast,
      notify: setToast,
      composerOpen,
      setComposerOpen,
      query,
      setQuery,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode, user, posts, saved, friendsIds, joinedGroups, followedPages, cart, notifications, threads, prefs, toast, composerOpen, query]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
