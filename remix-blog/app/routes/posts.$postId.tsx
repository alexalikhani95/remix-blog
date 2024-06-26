import { useLoaderData, Link } from "@remix-run/react";
import client from "../sanity/client";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { PostType } from "../types/post";

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    const postId = params.postId;

    const post: PostType = await client.fetch(`*[_id == "${postId}"]{
      _id,
      title,
      _createdAt,
      body,
      author->{
        name
      }
    }[0]`);

    return { post, error: null };
  } catch (error: any) {
    return { post: null, error: error.message };
  }
}

const Post = () => {
  const { post, error } = useLoaderData<typeof loader>();

  return (
    <div className="mx-auto px-4 py-8">
      <Link
        to="/posts"
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded inline-block mb-4"
      >
        Back to Posts
      </Link>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {post && (
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 mt-5">
          {post.title && (
            <h2 className="text-2xl font-semibold text-gray-800 bg-gradient-to-r from-purple-400 to-blue-500 text-white rounded-md py-2 px-4 mb-2">
              {post.title}
            </h2>
          )}
          <div className="flex justify-between mb-2">
            <p className="text-gray-600 font-medium">
              Published: {new Date(post._createdAt).toLocaleDateString("en-UK")}
            </p>
            {post.author && <p>by {post.author.name}</p>}
          </div>
          {post.body && (
            <div className="border-t border-gray-200 pt-2">
              <p className="mt-4 text-gray-700">
                {post.body[0].children[0].text}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Post;
