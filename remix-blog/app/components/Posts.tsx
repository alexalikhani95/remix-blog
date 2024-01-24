import React, { useEffect } from 'react'
import client from '../sanity/client'
import Post from './Post';
import { PostType } from '../types/post';


const Posts = () => {
    const [posts, setPosts] = React.useState<PostType[]>([])

    useEffect(() => {
        client.fetch(`*[_type == "post"]`).then((posts) => setPosts(posts))
    }, [])

    console.log('posts:', posts)


  return (
    <>
    <div>Posts</div>
    {posts.length && posts.map((post) => {
        return (
            <div key={post._id}>
            <Post post={post}/>
            </div>
        )
    })}
    </>
  )
}

export default Posts