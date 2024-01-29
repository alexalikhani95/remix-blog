import "../types/post";
import client from "../sanity/client";

import { useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ params }: LoaderFunctionArgs) {
  const postId = params.postId;

  const data = await client.fetch(`*[_id == "${postId}"]`);
  return data;
}

const Post = () => {
  const data = useLoaderData<typeof loader>();

  const post = data[0];

  return (
    <div>
      <h2>{post.title}</h2>
      {post.author && <p>Author{post.author}</p>}
      {post.body && <p>{post.body[0].children[0].text}</p>}
    </div>
  );
};

export default Post;
