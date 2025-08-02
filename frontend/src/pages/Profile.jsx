import React, { useEffect, useState } from 'react';
import { UserProfile } from '../components/UserProfile';
import { PostCard } from '../components/PostCard';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';

export const Profile = () => {
  const { user } = useAuth();
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await axios.get('/posts/me');
        setUserPosts(res.data);
      } catch (err) {
        console.error('Failed to fetch user posts:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserPosts();
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <UserProfile />

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Your Posts</h3>

            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Loading...</p>
              </div>
            ) : userPosts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">You haven't posted anything yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {userPosts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
