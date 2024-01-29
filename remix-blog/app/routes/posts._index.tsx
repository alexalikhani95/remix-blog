import { Link, useLoaderData } from "@remix-run/react";
import client from "../sanity/client";
import { PostType } from "../types/post";

export async function loader() {
  const data = client.fetch(`*[_type == "post"]`);
  return data;
}

const Posts = () => {
  const posts = useLoaderData<typeof loader>();

  return (
    <>
      <div className="flex flex-col items-center">
        <h2 className="mb-5">Posts</h2>
        {posts.length &&
          posts.map((post: PostType) => {
            return (
                <Link to={`/posts/${post._id}`} key={post._id}>
              <div key={post._id}>
                <h3>{post.title}</h3>
              </div>
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default Posts;
