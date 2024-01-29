import "../types/post";
import client from "../sanity/client";

import { useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";

export async function loader({ params }: LoaderFunctionArgs) {
  const postId = params.postId;

  const data = await client.fetch(`*[_id == "${postId}"]`);
  return data;
}

const Post = () => {
  const data = useLoaderData<typeof loader>();

  const post = data[0];

  return (
    <div className="container mx-auto px-4 py-8">
        <Link to="/posts" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Back to posts</Link>
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 mt-5">
        <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
        {post.author && <p className="mt-2 text-gray-600">Author: {post.author}</p>}
        {post.body && <p className="mt-4 text-gray-700">{post.body[0].children[0].text}</p>}
      </div>
    </div>
  );
};

export default Post;
