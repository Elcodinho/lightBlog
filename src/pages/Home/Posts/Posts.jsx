import { useSelector } from "react-redux";
import { selectPosts } from "@store/postSlice";
import { Post } from "./Post/Post";
import "./Posts.css";

export function Posts() {
  const posts = useSelector(selectPosts);
  const postsReverse = [...posts].reverse();

  return (
    <ul className="posts__list">
      {postsReverse.map((item) => (
        <Post
          key={item.id}
          id={item.id}
          title={item.title}
          dateTime={item.datetime}
          body={item.body}
        />
      ))}
    </ul>
  );
}
