import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "My Remix blog" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold underline">Welcome to my Remix Blog</h1>
      <Link to="/posts" className="underline mt-10">Go to posts</Link>
    </div>
  );
}
