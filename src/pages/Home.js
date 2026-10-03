import Feed from "../Components/Feed";
import Rightbar from "../Components/Rightbar";
import { useApp } from "../context/AppContext";

const Home = () => {
  const { posts, query, setComposerOpen } = useApp();
  const filtered = query
    ? posts.filter((p) => (p.name + p.description).toLowerCase().includes(query.toLowerCase()))
    : posts;
  return (
    <>
      <Feed posts={filtered} query={query} onCompose={() => setComposerOpen(true)} />
      <Rightbar />
    </>
  );
};

export default Home;
