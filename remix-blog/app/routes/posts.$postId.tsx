import "../types/post";
import client from "../sanity/client";
import { useLoaderData, Link } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ params }: LoaderFunctionArgs) {
  const postId = params.postId;

  const data = await client.fetch(`*[_id == "${postId}"][0]`);

  return data;
}

const Post = () => {
  const data = useLoaderData<typeof loader>();
  const post = data;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/posts"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block mb-4"
      >
        Back to posts
      </Link>
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 mt-5">
        {post.title && (
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {post.title}
          </h2>
        )}
        {post._createdAt && (
          <p className="mt-2 text-gray-600">
            Published: {new Date(post._createdAt).toLocaleDateString("en-UK")}
          </p>
        )}
        {post.body && (
          <p className="mt-4 text-gray-700">{post.body[0].children[0].text}</p>
        )}
      </div>
    </div>
  );
};

export default Post;
