import type { MetaFunction } from "@remix-run/node";
import Posts from "../components/Posts";

export const meta: MetaFunction = () => {
  return [
    { title: "My Remix blog" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Welcome to my Remix Blog</h1>
      <div className="flex flex-col">
        <Posts />
      </div>
    </div>
  );
}
