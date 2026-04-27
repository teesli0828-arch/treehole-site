import { useEffect, useState } from 'react'
import supabase from '../lib/supabase'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [content, setContent] = useState('')

  const fetchPosts = async () => {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
    setPosts(data)
  }

  const addPost = async () => {
    if (!content) return
    await supabase.from('posts').insert([
      {
        content,
        anonymous_id: '小月亮#' + Math.floor(Math.random()*1000)
      }
    ])
    setContent('')
    fetchPosts()
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h2>🌙 树洞</h2>

      <textarea
        placeholder="说点没人知道的话..."
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <br />
      <button onClick={addPost}>投递</button>

      <hr />

      {posts.map(p => (
        <div key={p.id} style={{ marginBottom: 20 }}>
          <p>{p.content}</p>
          <small>{p.anonymous_id}</small>
        </div>
      ))}
    </div>
  )
}
