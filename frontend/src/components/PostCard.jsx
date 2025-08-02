// components/PostCard.jsx
import React from 'react';

export const PostCard = ({ post }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800">
          {post.author?.email || 'Unknown Author'}
        </h4>
        <p className="text-sm text-gray-400">
          {new Date(post.createdAt).toLocaleString()}
        </p>
      </div>
      <p className="text-gray-700">{post.content}</p>
    </div>
  );
};
