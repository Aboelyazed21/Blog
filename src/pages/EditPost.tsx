import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Save, Eye, Image, Tag, ArrowLeft, Paperclip, FileText, X } from 'lucide-react';
import { useBlog } from '../contexts/BlogContext';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ImageUpload from '../components/common/ImageUpload';
import FileUpload from '../components/common/FileUpload';

interface PostForm {
  title: string;
  content: string;
  excerpt: string;
  tags: string;
  coverImage: string;
  published: boolean;
}

interface AttachedFile {
  url: string;
  type: string;
  name: string;
}

const EditPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isPreview, setIsPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [coverImage, setCoverImage] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const { getPost, updatePost } = useBlog();
  const { user } = useAuth();
  const navigate = useNavigate();

  const post = id ? getPost(id) : null;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PostForm>();

  const watchedData = watch();

  useEffect(() => {
    if (post) {
      setValue('title', post.title);
      setValue('content', post.content);
      setValue('excerpt', post.excerpt);
      setValue('tags', post.tags.join(', '));
      setValue('coverImage', post.coverImage || '');
      setValue('published', post.published);
      setCoverImage(post.coverImage || '');
      
      // Load attached files if they exist
      if ((post as any).attachedFiles) {
        setAttachedFiles((post as any).attachedFiles);
      }
    }
  }, [post, setValue]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center animate-in fade-in-50 slide-in-from-bottom-4 duration-1000">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300">The post you're trying to edit doesn't exist.</p>
        </div>
      </div>
    );
  }

  if (!user || (user.id !== post.author.id && user.role !== 'admin')) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center animate-in fade-in-50 slide-in-from-bottom-4 duration-1000">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Access Denied</h2>
          <p className="text-gray-600 dark:text-gray-300">You don't have permission to edit this post.</p>
        </div>
      </div>
    );
  }

  const calculateReadTime = (content: string): number => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  const handleCoverImageSelect = (imageUrl: string) => {
    setCoverImage(imageUrl);
    setValue('coverImage', imageUrl);
  };

  const handleFileSelect = (fileUrl: string, fileType: string, fileName: string) => {
    if (fileUrl) {
      const newFile: AttachedFile = { url: fileUrl, type: fileType, name: fileName };
      setAttachedFiles(prev => [...prev, newFile]);
    }
  };

  const removeAttachedFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: PostForm) => {
    setSaving(true);
    try {
      const updatedPost = {
        title: data.title,
        content: data.content,
        excerpt: data.excerpt,
        tags: data.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        coverImage: coverImage || undefined,
        published: data.published,
        readTime: calculateReadTime(data.content),
        attachedFiles: attachedFiles,
      };

      updatePost(post.id, updatedPost);
      navigate(`/post/${post.id}`);
    } catch (error) {
      console.error('Error updating post:', error);
    } finally {
      setSaving(false);
    }
  };

  const previewData = {
    ...watchedData,
    tags: watchedData.tags?.split(',').map(tag => tag.trim()).filter(Boolean) || [],
    readTime: calculateReadTime(watchedData.content || ''),
    author: post.author,
    createdAt: post.createdAt,
    coverImage: coverImage,
    attachedFiles: attachedFiles,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8 animate-in fade-in-50 slide-in-from-top-4 duration-1000">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(`/post/${post.id}`)}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 transform hover:scale-110"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Post</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setIsPreview(!isPreview)}
                className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
              >
                <Eye className="h-4 w-4 mr-2" />
                {isPreview ? 'Edit' : 'Preview'}
              </button>
              <button
                onClick={handleSubmit(onSubmit)}
                disabled={saving}
                className="flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 shadow-lg hover:shadow-xl"
              >
                {saving ? <LoadingSpinner /> : <Save className="h-4 w-4 mr-2" />}
                {saving ? 'Saving...' : 'Update Post'}
              </button>
            </div>
          </div>
        </div>

        {isPreview ? (
          /* Preview Mode */
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden animate-in fade-in-50 slide-in-from-bottom-4 duration-1000">
            {previewData.coverImage && (
              <div className="h-64 overflow-hidden">
                <img
                  src={previewData.coverImage}
                  alt={previewData.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-8">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4 space-x-4">
                <span>{new Date(previewData.createdAt).toLocaleDateString()}</span>
                <span>{previewData.readTime} min read</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  previewData.published 
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                    : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                }`}>
                  {previewData.published ? 'Published' : 'Draft'}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {previewData.title || 'Your Post Title'}
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                {previewData.excerpt || 'Your post excerpt will appear here...'}
              </p>
              
              <div className="prose max-w-none mb-8">
                {previewData.content ? (
                  <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed">
                    {previewData.content}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic">Your post content will appear here...</p>
                )}
              </div>

              {/* Attached Files Preview */}
              {previewData.attachedFiles && previewData.attachedFiles.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Paperclip className="h-5 w-5 mr-2" />
                    Attached Files ({previewData.attachedFiles.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {previewData.attachedFiles.map((file, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-700">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {file.type}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {previewData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {previewData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Edit Mode */
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 animate-in fade-in-50 slide-in-from-bottom-4 duration-1000">
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Post Title *
                  </label>
                  <input
                    {...register('title', { required: 'Title is required' })}
                    type="text"
                    placeholder="Enter your post title"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                  />
                  {errors.title && (
                    <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.title.message}</p>
                  )}
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Excerpt *
                  </label>
                  <textarea
                    {...register('excerpt', { 
                      required: 'Excerpt is required',
                      maxLength: { value: 200, message: 'Excerpt must be 200 characters or less' }
                    })}
                    rows={3}
                    placeholder="Brief description of your post (max 200 characters)"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                  />
                  {errors.excerpt && (
                    <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.excerpt.message}</p>
                  )}
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    {watchedData.excerpt?.length || 0}/200 characters
                  </p>
                </div>

                {/* Cover Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cover Image
                  </label>
                  <ImageUpload
                    onImageSelect={handleCoverImageSelect}
                    currentImage={coverImage}
                    className="mb-4"
                  />
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Or enter image URL manually:
                  </div>
                  <div className="relative mt-2">
                    <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      {...register('coverImage')}
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={coverImage}
                      onChange={(e) => {
                        setCoverImage(e.target.value);
                        setValue('coverImage', e.target.value);
                      }}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    />
                  </div>
                </div>

                {/* File Attachments */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Attach Files (Optional)
                  </label>
                  <FileUpload
                    onFileSelect={handleFileSelect}
                    label="Upload Files"
                    maxSize={10}
                    className="mb-4"
                  />
                  
                  {/* Display attached files */}
                  {attachedFiles.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Attached Files ({attachedFiles.length})
                      </h4>
                      <div className="space-y-2">
                        {attachedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700">
                            <div className="flex items-center space-x-3">
                              <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {file.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {file.type}
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeAttachedFile(index)}
                              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors duration-300"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tags
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      {...register('tags')}
                      type="text"
                      placeholder="React, JavaScript, Web Development (comma separated)"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Separate tags with commas
                  </p>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Content *
                  </label>
                  <textarea
                    {...register('content', { required: 'Content is required' })}
                    rows={20}
                    placeholder="Write your post content here..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                  />
                  {errors.content && (
                    <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.content.message}</p>
                  )}
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Estimated read time: {calculateReadTime(watchedData.content || '')} minutes
                  </p>
                </div>

                {/* Publish Option */}
                <div className="flex items-center space-x-3">
                  <input
                    {...register('published')}
                    type="checkbox"
                    id="published"
                    className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 transition-all duration-300"
                  />
                  <label htmlFor="published" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Published
                  </label>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    (Uncheck to save as draft)
                  </span>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditPost;