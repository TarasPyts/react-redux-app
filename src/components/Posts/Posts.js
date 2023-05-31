import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchPosts,
  selectPostsByUserId,
  addPost,
} from '../../features/postsSlice';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Posts = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState({ title: '', body: '' });

  const posts = useSelector((state) =>
    selectPostsByUserId(state, parseInt(userId))
  );

  useEffect(() => {
    dispatch(fetchPosts(parseInt(userId)));
  }, [dispatch, userId]);

  const handleDetailsClick = (postId) => {
    navigate(`/posts/details/${postId}`);
  };

  const handleNewPostSubmit = (e) => {
    e.preventDefault();

    const newId = uuidv4();
    const post = {
      id: newId,
      userId: parseInt(userId),
      ...newPost,
    };
    console.log(newId);
    dispatch(addPost(post));
    setNewPost({ title: '', body: '' });
  };

  return (
    <div className="posts-container">
      <h2 className="posts-title">Posts</h2>
      <ul className="posts-list">
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <button onClick={() => handleDetailsClick(post.id)}>Details</button>
          </li>
        ))}
      </ul>

      <h2 className="new-post-title">Add New Post</h2>
      <form onSubmit={handleNewPostSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <textarea
          placeholder="Body"
          value={newPost.body}
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
        ></textarea>
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default Posts;
