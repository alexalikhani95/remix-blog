import client from '../sanity/client'
import { PostType } from '../types/post';
import Post from '../components/Post';
import { useLoaderData } from '@remix-run/react';

export async function loader() {
  const data = client.fetch(`*[_type == "post"]`)
    return data
}

const Posts = () => {
    const posts = useLoaderData<typeof loader>();

  return (
    <>
    <div className='flex flex-col items-center'>
        <h2 className='mb-5'>Posts</h2>
    {posts.length && posts.map((post: PostType) => {
        return (
            <div key={post._id}>
            <Post post={post}/>
            </div>
        )
    })}
    </div>
    </>
  )
}

export default Posts