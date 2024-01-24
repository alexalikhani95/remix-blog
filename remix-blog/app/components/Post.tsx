import { PostType } from "../types/post";

type Props = {
    post: PostType
}


const Post = ({post}: Props) => {
  return (
    <div>
       {post.title && <h2>{post.title}</h2>}
       {post.author && <p>Author{post.author}</p>}
    </div>
  )
}

export default Post