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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold mb-5">Blog Posts</h2>
        {posts.length &&
          posts.map((post: PostType) => {
            return (
              <Link to={`/posts/${post._id}`} key={post._id}>
                <div className="bg-white rounded-lg shadow-md p-4 mb-4 cursor-pointer transition duration-300 hover:shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Posts;
