import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchPost,
  fetchComments,
  deleteComment,
  editComment,
} from '../../features/postSlice';

const Post = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();

  const { post, comments, status, error } = useSelector((state) => state.post);

  const [editedComments, setEditedComments] = useState({});
  const [editMode, setEditMode] = useState({});

  useEffect(() => {
    dispatch(fetchPost(postId));
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment({ postId, commentId }));
  };

  const handleEditComment = (commentId) => {
    const editedComment = editedComments[commentId];
    dispatch(editComment({ commentId, editedComment }));
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [commentId]: false,
    }));
  };

  const handleInputChange = (commentId, e) => {
    const { name, value } = e.target;
    setEditedComments((prevEditedComments) => ({
      ...prevEditedComments,
      [commentId]: { ...prevEditedComments[commentId], [name]: value },
    }));
  };

  const handleToggleEditMode = (commentId) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [commentId]: !prevEditMode[commentId],
    }));
  };

  if (status === 'loading') {
    return <div>Loading post...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {post && (
        <React.Fragment>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </React.Fragment>
      )}
      <h2>Comments</h2>
      {comments.map((comment) => (
        <div key={comment.id}>
          <h3>{comment.name}</h3>
          {editMode[comment.id] ? (
            <div>
              <input
                type="text"
                name="body"
                value={editedComments[comment.id]?.body || ''}
                onChange={(e) => handleInputChange(comment.id, e)}
              />
              <button onClick={() => handleEditComment(comment.id)}>
                Save
              </button>
            </div>
          ) : (
            <div>
              <p>{comment.body}</p>
              <button onClick={() => handleToggleEditMode(comment.id)}>
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
