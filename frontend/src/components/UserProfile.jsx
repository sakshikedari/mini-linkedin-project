import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/Card';
import { Textarea } from './ui/Input';
import { Button } from './ui/Button';
import { Edit2, Save, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const UserProfile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState(user?.bio || '');

  if (!user) return null;

  const handleSave = () => {
    updateUser({ bio: editedBio });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedBio(user.bio || '');
    setIsEditing(false);
  };

  const getInitial = () => {
    return user?.name?.charAt(0)?.toUpperCase() || 'U';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Profile</h2>
          {!isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-1"
            >
              <Edit2 size={16} />
              <span>Edit</span>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-blue-600 font-semibold text-xl">
              {getInitial()}
            </span>
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{user?.name}</h3>
              <p className="text-gray-600">{user?.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              {isEditing ? (
                <div className="space-y-3">
                  <Textarea
                    value={editedBio}
                    onChange={(e) => setEditedBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    rows={3}
                  />
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={handleSave}>
                      <Save size={16} className="mr-1" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleCancel}>
                      <X size={16} className="mr-1" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 p-3 bg-gray-50 rounded-lg">
                  {user?.bio || 'No bio added yet.'}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
