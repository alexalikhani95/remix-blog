import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import client from "../sanity/client";
import { PostType } from "../types/post";
import type { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request}: LoaderFunctionArgs) {
  const data = client.fetch(`*[_type == "post"]`);

  const searchParams = new URL(request.url).searchParams;

  const searchOption = searchParams.get("search");

  if (searchOption) {
    return data.then((posts: PostType[]) => {
      return posts.filter((post) => {
        return post?.title?.toLowerCase().includes(searchOption.toLowerCase());
      });
    });
  }

  return data;
}

const Posts = () => {
  const posts = useLoaderData<typeof loader>();

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (search: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("search", search);
    setSearchParams(params);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold mb-5">Blog Posts</h2>
        <label className="block mb-4">
          <h3 className="mb-2">Search for post</h3>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
            placeholder="Title..."
            onChange={(e) => handleSearch(e.target.value)}
            value={searchParams.get("search") || ""}
          />
        </label>
        {posts.length ?
          posts.map((post: PostType) => (
            <Link to={`/posts/${post._id}`} key={post._id}>
              <div className="bg-white rounded-lg shadow-md p-4 mb-4 cursor-pointer transition duration-300 hover:shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))
          :
          <p className="text-gray-600">No posts found.</p>
        }
      </div>
    </div>
  );
};

export default Posts;
