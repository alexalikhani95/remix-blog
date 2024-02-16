import { createRemixStub } from "@remix-run/testing";
import { render, screen, waitFor } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { json } from "@remix-run/node";
import Posts from "../app/routes/posts._index";

vi.mock("@sanity/client/stega", () => {
  return {
    createClient: vi.fn(),
  };
});

test("The posts page renders with the correct data from posts displayed", async () => {
  const RemixStub = createRemixStub([
    {
      path: "/posts",
      Component: Posts,
      loader() {
        return json({
          posts: [
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
            {
              _id: "2",
              title: "Second Post",
              _createdAt: "2024-02-01",
              body: [
                {
                  _type: "block",
                  children: [
                    {
                      _type: "span",
                      text: "Test content 2",
                    },
                  ],
                },
              ],
              author: { name: "Author 2" },
            },
          ],
        });
      },
    },
  ]);

  render(<RemixStub initialEntries={["/posts"]} />);

  await waitFor(() =>
    expect(screen.getByText("Blog Posts")).toBeInTheDocument()
  );
  expect(screen.getByText("First Post")).toBeInTheDocument();
  expect(screen.getByText("Published: 01/01/2024")).toBeInTheDocument();
  expect(screen.getByText("by Author 1")).toBeInTheDocument();
  expect(screen.getByText("Test content 1")).toBeInTheDocument();

  expect(screen.getByText("Second Post")).toBeInTheDocument();
  expect(screen.getByText("Published: 01/02/2024")).toBeInTheDocument();
  expect(screen.getByText("by Author 2")).toBeInTheDocument();
  expect(screen.getByText("Test content 2")).toBeInTheDocument();
});

test("The posts page renders with the correct text when there are no posts", async () => {
  const RemixStub = createRemixStub([
    {
      path: "/posts",
      Component: Posts,
      loader() {
        return json({ posts: [] });
      },
    },
  ]);

  render(<RemixStub initialEntries={["/posts"]} />);

  await waitFor(() =>
    expect(screen.getByText("Blog Posts")).toBeInTheDocument()
  );
  expect(screen.getByText("No posts found.")).toBeInTheDocument();
});
