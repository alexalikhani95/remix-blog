import { createRemixStub } from "@remix-run/testing";
import { render, screen, waitFor } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { json } from "@remix-run/node";
import Post from "../app/routes/posts.$postId";

vi.mock("@sanity/client/stega", () => {
  return {
    createClient: vi.fn(),
  };
});

test("The page renders with the correct data from the post displayed", async () => {
  const RemixStub = createRemixStub([
    {
      path: "/posts/1",
      Component: Post,
      loader() {
        return json({
          post: 
            {
              _id: "1",
              title: "First Post",
              _createdAt: "2024-01-01",
              body: [
                {
                  _type: "block",
                  children: [
                    {
                      _type: "span",
                      text: "Test content 1",
                    },
                  ],
                },
              ],
              author: { name: "Author 1" },
            },
        });
      },
    },
  ]);

  render(<RemixStub initialEntries={["/posts/1"]} />);

  await waitFor(() =>
    expect(screen.getByText("Back to Posts")).toBeInTheDocument()
  );
  expect(screen.getByText("First Post")).toBeInTheDocument()
  expect(screen.getByText("by Author 1")).toBeInTheDocument()
  expect(screen.getByText("Test content 1")).toBeInTheDocument()
});

