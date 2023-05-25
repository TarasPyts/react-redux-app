import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    body: '',
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts?userId=1'
      );
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const navigate = useNavigate();

  const handleDetailsClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const handleAddNewClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleCreatePost = async () => {
    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        newPost
      );
      const createdPost = response.data;
      setShowPopup(false);

      const highestId = Math.max(...posts.map((post) => post.id));

      createdPost.id = highestId + 1;

      setPosts((prevPosts) => [...prevPosts, createdPost]);
      setNewPost({ title: '', body: '' });
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <h1>Posts</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>
                <button onClick={() => handleDetailsClick(post.id)}>
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddNewClick}>Add new</button>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Create New Post</h2>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={newPost.title}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Body:
              <textarea
                name="body"
                value={newPost.body}
                onChange={handleInputChange}
              />
            </label>
            <button onClick={handleCreatePost}>Create</button>
            <button onClick={handlePopupClose}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
