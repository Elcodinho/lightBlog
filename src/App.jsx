import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home/Home";
import { NewPost } from "./pages/NewPost/NewPost";
import { About } from "./pages/About/About";
import { PostPage } from "./pages/PostPage/PostPage";
import { EditPost } from "./pages/EditPost/EditPost";
import { Error } from "./pages/Error/Error";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="newpost" element={<NewPost />} />
          <Route path="about" element={<About />} />
          <Route path="posts/:id" element={<PostPage />} />
          <Route path="posts/:id/edit" element={<EditPost />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
