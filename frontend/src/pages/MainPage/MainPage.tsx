import { PostCard } from '@/components/PostCard/PostCard'
import styles from './MainPage.module.css'
import { useEffect, useState } from 'react'
import { getPosts } from '@/api/posts'
import type { Post } from '@/types/post'

import photo1 from '@/assets/examples/ex1.png'
import photo2 from '@/assets/examples/ex2.png'
import photo3 from '@/assets/examples/ex3.png'
import photo4 from '@/assets/examples/ex5.png'

const postExample = {
  id: 999,
  title: 'Title exmpl',
  description: 'Description exmpl',
  images: [{ url: `${photo1}` }, { url: `${photo2}` }, { url: `${photo3}` }, { url: `${photo4}` }]
}

export const MainPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts().then(res => setPosts(res.data)).catch(err => console.log(err));
  }, [])

  return (
    <div className={styles.posts}>
      {
        posts.map(post => <PostCard key={post.id} post={post} />)
      }
      <PostCard post={postExample} />
    </div>
  )
}