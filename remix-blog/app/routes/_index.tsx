import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "My Remix blog" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="bg-gradient-to-r from-purple-400 to-blue-500 w-full py-24 text-center text-white">
        <h1 className="text-5xl font-bold mb-8">Welcome to My Blog</h1>
        <Link to="/posts" className="bg-white text-blue-500 font-semibold py-3 px-8 rounded-full hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out">
          Discover Posts
        </Link>
      </div>
    </div>
  );
}
