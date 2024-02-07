import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import client from "../sanity/client";
import { PostType } from "../types/post";
import type { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;
  const searchOption = searchParams.get("search");
  const sortOption = searchParams.get("sort") || "recent"; // recent as the default sort option

  let query = `*[_type == "post"]{
    _id,
    title,
    _createdAt,
    body,
    author->{
      name
    }
  }`;

  if (searchOption) {
    query = `*[_type == "post" && (title match "${searchOption}*")]{
      _id,
      title,
      _createdAt,
      body,
      author->{
        name
      }
    }`;
  }

  // Apply sorting based on sortOption
  if (sortOption === "a-z") {
    query = `${query} | order(lower(title) asc)`;
  } else if (sortOption === "z-a") {
    query = `${query} | order(lower(title) desc)`;
  } else if (sortOption === "oldest") {
    query = `${query} | order(_createdAt asc)`;
  } else if (sortOption === "recent") {
    query = `${query} | order(_createdAt desc)`;
  }

  const posts: PostType[] = await client.fetch(query);
  return posts;
}

const Posts = () => {
  const posts = useLoaderData<typeof loader>();

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (search: string) => {
    const newSearchParams = new URLSearchParams();

    // Add search parameter
    newSearchParams.set("search", search);

    // keep the sorted order even when searching
    const sortOption = searchParams.get("sort");
    if (sortOption) {
      newSearchParams.set("sort", sortOption);
    }

    setSearchParams(newSearchParams);
  };

  const handleSort = (sort: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", sort);
    setSearchParams(params);
  };

  return (
    <div className="mx-auto px-4 py-8">
      <div className="max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold mb-5">Blog Posts</h2>
        <label className="block mb-4">
          <h3 className="mb-2 text-blue-600 font-bold">Sort by</h3>
          <select
            onChange={(e) => handleSort(e.target.value)}
            className="bg-blue-100 border border-blue-300 text-blue-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 transition duration-300 ease-in-out hover:bg-blue-200"
            name="sort"
            value={searchParams.get("sort") || "recent"}
          >
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
            <option value="oldest">Oldest</option>
            <option value="recent">Recent</option>
          </select>
        </label>

        <label className="block mb-4">
          <h3 className="mb-2 text-purple-600 font-bold">Search for a Post</h3>
          <input
            type="text"
            className="p-2 border border-purple-400 rounded-lg w-full focus:outline-none focus:border-purple-600 transition duration-300 ease-in-out hover:bg-purple-100"
            placeholder="Search by title..."
            onChange={(e) => handleSearch(e.target.value)}
            value={searchParams.get("search") || ""}
          />
        </label>

        {posts.length ? (
          posts.map((post) => (
            <Link to={`/posts/${post._id}`} key={post._id}>
              <div className="bg-white rounded-lg shadow-md p-4 mb-4 cursor-pointer transition duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="text-lg font-semibold text-gray-800 bg-gradient-to-r from-purple-400 to-blue-500 text-white rounded-md py-2 px-4 mb-2 hover:underline">
                  {post.title}
                </h3>
                <div className="flex justify-between mb-2">
                  <p className="text-gray-600 font-medium">
                  Published: {new Date(post._createdAt).toLocaleDateString("en-UK")}
                  </p>
                 {post.author && <p>by {post.author.name}</p> }
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <p className="text-gray-700">
                    {post.body[0].children[0].text.slice(0, 100)}
                    {post.body[0].children[0].text.length > 100 ? "..." : ""}
                  </p>
                  <p>Read on...</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-600">No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default Posts;
