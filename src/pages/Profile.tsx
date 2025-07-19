import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, Mail, Calendar, Settings, Edit, Save, Camera } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useBlog } from '../contexts/BlogContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ImageUpload from '../components/common/ImageUpload';

interface ProfileForm {
  name: string;
  email: string;
  bio: string;
  website: string;
  location: string;
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { posts } = useBlog();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [profileImage, setProfileImage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      bio: 'Passionate writer and technology enthusiast.',
      website: '',
      location: '',
    },
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center animate-in fade-in-50 slide-in-from-bottom-4 duration-1000">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Authentication Required</h2>
          <p className="text-gray-600 dark:text-gray-300">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  const userPosts = posts.filter(post => post.author.id === user.id);
  const publishedPosts = userPosts.filter(post => post.published);
  const draftPosts = userPosts.filter(post => !post.published);

  const onSubmit = async (data: ProfileForm) => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEditing(false);
      console.log('Profile updated:', data);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleImageSelect = (imageUrl: string) => {
    setProfileImage(imageUrl);
    console.log('Profile image updated:', imageUrl);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-8 animate-in fade-in-50 slide-in-from-top-4 duration-1000">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600"></div>
          <div className="relative px-6 pb-6">
            <div className="flex items-end space-x-6 -mt-16">
              <div className="relative">
                <div className="w-32 h-32 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="h-16 w-16 text-white" />
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => document.getElementById('profile-image-upload')?.click()}
                  className="absolute bottom-2 right-2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-110"
                >
                  <Camera className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                </button>
                <input
                  id="profile-image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const result = event.target?.result as string;
                        handleImageSelect(result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
              <div className="flex-1 min-w-0 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
                    <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Member since {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                      {user.role === 'admin' && (
                        <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs px-2 py-1 rounded-full animate-pulse">
                          Admin
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-8 animate-in fade-in-50 slide-in-from-top-6 duration-1000 delay-200">
          <nav className="flex border-b border-gray-200 dark:border-gray-700">
            {[
              { id: 'profile', label: 'Profile Info' },
              { id: 'posts', label: 'My Posts' },
              { id: 'settings', label: 'Settings' },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-all duration-300 ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'profile' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 animate-in fade-in-50 slide-in-from-bottom-4 duration-1000">
            {isEditing ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    />
                    {errors.name && (
                      <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      {...register('email', { required: 'Email is required' })}
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    />
                    {errors.email && (
                      <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Website
                    </label>
                    <input
                      {...register('website')}
                      type="url"
                      placeholder="https://yourwebsite.com"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Location
                    </label>
                    <input
                      {...register('location')}
                      type="text"
                      placeholder="City, Country"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    {...register('bio')}
                    rows={4}
                    placeholder="Tell us about yourself..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 shadow-lg hover:shadow-xl"
                  >
                    {saving ? <LoadingSpinner /> : <Save className="h-4 w-4 mr-2" />}
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Full Name</h3>
                    <p className="text-gray-900 dark:text-white">{user.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email</h3>
                    <p className="text-gray-900 dark:text-white">{user.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Role</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' 
                        : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                    }`}>
                      {user.role === 'admin' ? 'Administrator' : 'User'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Member Since</h3>
                    <p className="text-gray-900 dark:text-white">{new Date(user.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Bio</h3>
                  <p className="text-gray-900 dark:text-white">Passionate writer and technology enthusiast.</p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'posts' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Edit, label: 'Total Posts', value: userPosts.length, color: 'from-blue-600 to-purple-600' },
                { icon: Settings, label: 'Published', value: publishedPosts.length, color: 'from-green-600 to-blue-600' },
                { icon: Calendar, label: 'Drafts', value: draftPosts.length, color: 'from-yellow-600 to-orange-600' }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 animate-in fade-in-50 slide-in-from-bottom-4 duration-1000"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center">
                    <div className={`p-2 bg-gradient-to-r ${stat.color} rounded-lg`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Posts List */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm animate-in fade-in-50 slide-in-from-bottom-6 duration-1000 delay-300">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your Posts</h3>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {userPosts.length > 0 ? (
                  userPosts.map((post, index) => (
                    <div 
                      key={post.id} 
                      className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 animate-in fade-in-50 slide-in-from-left-4 duration-500"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                            {post.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{post.excerpt}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                            <span>{post.readTime} min read</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              post.published 
                                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                                : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                            }`}>
                              {post.published ? 'Published' : 'Draft'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300 transform hover:scale-110">
                            Edit
                          </button>
                          <button className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-300 transform hover:scale-110">
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center">
                    <Edit className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-pulse" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No posts yet</h3>
                    <p className="text-gray-600 dark:text-gray-300">Start writing your first blog post!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 animate-in fade-in-50 slide-in-from-bottom-4 duration-1000">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Account Settings</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Email Notifications</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Receive email updates about your posts</p>
                </div>
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 transition-all duration-300"
                  defaultChecked
                />
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Marketing Emails</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Receive updates about new features</p>
                </div>
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 transition-all duration-300"
                />
              </div>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors duration-300 transform hover:scale-105">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;