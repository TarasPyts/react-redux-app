import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState('');

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [postId]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
      );
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleEditComment = (commentId) => {
    setEditingCommentId(commentId);
    const comment = comments.find((comment) => comment.id === commentId);
    setEditedComment(comment.body);
  };

  const handleSaveComment = (commentId) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId ? { ...comment, body: editedComment } : comment
      )
    );
    setEditingCommentId(null);
    setEditedComment('');
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/comments/${commentId}`
      );
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (!post) {
    return <div>Loading post...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <h2>Comments</h2>
      {comments.map((comment) => (
        <div key={comment.id}>
          {editingCommentId === comment.id ? (
            <div>
              <textarea
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
              ></textarea>
              <button onClick={() => handleSaveComment(comment.id)}>
                Save
              </button>
            </div>
          ) : (
            <div>
              <h3>{comment.name}</h3>
              <p>{comment.body}</p>
              <button onClick={() => handleEditComment(comment.id)}>
                Edit
              </button>
              <button onClick={() => handleDeleteComment(comment.id)}>
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Post;
