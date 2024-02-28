import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get("http://localhost:3000/posts", () => {
    return HttpResponse.json({
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
  }),
  http.get("http://localhost:3000/posts/1", () => {
    return HttpResponse.json({
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
  }),
  http.get("http://localhost:3000/posts/2", () => {
    return HttpResponse.json({
      post: 
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
    });
  }),
];

