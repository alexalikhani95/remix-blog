import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import client from "../sanity/client";
import { PostType } from "../types/post";
import type { LoaderFunctionArgs } from "@remix-run/node";

const fetchPosts = async (sortOption: string) => {
  let query = `*[_type == "post"]`;
  if (sortOption === "a-z") {
    query = `${query} | order(title asc)`;
  } else if (sortOption === "z-a") {
    query = `${query} | order(title desc)`;
  } else if (sortOption === "oldest") {
    query = `${query} | order(_createdAt asc)`;
  } else if (sortOption === "recent") {
    query = `${query} | order(_createdAt desc)`;
  }
  const data = await client.fetch(query);
  return data;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;
  const searchOption = searchParams.get("search");
  const sortOption = searchParams.get("sort") || "recent"; // recent as the default sort option
  
  let posts: PostType[];


  if (searchOption) {
    // Fetch posts with search option applied
    posts = await fetchPosts(sortOption);
    // Filter posts based on search option
    posts = posts.filter((post) =>
      post.title?.toLowerCase().includes(searchOption.toLowerCase())
    );
  } else {
    // Fetch posts without search option
    posts = await fetchPosts(sortOption);
  }

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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold mb-5">Blog Posts</h2>
        <label className="block mb-4">
          <h3 className="mb-2">Sort by</h3>
          <select
            onChange={(e) => handleSort(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
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
          <h3 className="mb-2">Search for post</h3>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
            placeholder="Title..."
            onChange={(e) => handleSearch(e.target.value)}
            value={searchParams.get("search") || ""}
          />
        </label>
        {posts.length ? (
          posts.map((post) => (
            <Link to={`/posts/${post._id}`} key={post._id}>
              <div className="bg-white rounded-lg shadow-md p-4 mb-4 cursor-pointer transition duration-300 hover:shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800">
                  {post.title}
                </h3>
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
