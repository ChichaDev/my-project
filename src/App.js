import React, {useMemo, useState} from "react"
import Counter from "./components/Counter"
import "./styles/App.css";
import PostItem from "./components/PostItem"
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";

function App() { 
  const [posts, setPosts] = useState([
    {id:1, title: "рара", body: "екно"},
    {id:2, title: "мыв 2", body: "кйк"},
    {id:3, title: "длг 3", body: "оне"},
    {id:4, title: "длав 3", body: "куцкцу"},
  ])
  

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

// Получаем post из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  
  const [filter, setFilter] = useState({sort: "", query: ""})
  
  const sortedPosts = useMemo(() => {
    if(filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
    }
    return posts
  }, [filter.sort, posts])

  const sortedAndSearchPosts = useMemo(() => {
  return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
  }, [filter.query, sortedPosts])


  return (
    <div className="App"> 
    <MyModal></MyModal>
      <PostForm create={createPost} />
      <hr style={{margin: "15px 0"}} />
      <PostFilter
      filter={filter}
      setFilter={setFilter}
      />
      <PostList remove={removePost} posts={sortedAndSearchPosts} title="Посты про JS" />
      </div>          
  );
}

export default App;
