import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Users from './components/Users/Users';
import Posts from './components/Posts/Posts';
import Post from './components/Post/Post';

import './App.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/posts" element={<Posts />} />
        <Route exact path="/posts/:postId" element={<Post />} />
      </Routes>
    </Router>
  );
}

export default App;
