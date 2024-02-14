import { createRemixStub } from "@remix-run/testing";
import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { test, vi } from 'vitest'
import Posts from "../app/routes/posts._index"

vi.mock("@sanity/client/stega", () => {
  return {
    createClient: vi.fn(),
  };
})

test("renders loader data", async () => {

  const RemixStub = createRemixStub([
    {
      path: "/posts",
      Component: Posts,
      loader() {
        return [
            {
                _id: "1",
                title: "hello",
                body: []
            }
        ];
      },
    },
  ]);

  render(<RemixStub />);

  await waitFor(() => screen.findByText("hello"));
}
)