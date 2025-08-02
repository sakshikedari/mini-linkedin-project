import React, { useEffect } from 'react';
import { PostCreator } from '../components/PostCreator';
import { PostCard } from '../components/PostCard';
import { usePosts } from '../context/PostContext';

export const Home = () => {
  const { posts, fetchPosts } = usePosts();

  useEffect(() => {
    fetchPosts(); // fetch posts on initial load
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <PostCreator onPostCreated={fetchPosts} />

          <div className="space-y-4">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No posts yet. Be the first to share something!</p>
              </div>
            ) : (
              posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
