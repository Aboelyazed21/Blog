import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BlogPost, BlogContextType } from '../types';
import { useAuth } from './AuthContext';

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

interface BlogProviderProps {
  children: ReactNode;
}

const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with Modern Web Development',
    content: 'In this comprehensive guide, we\'ll explore the fundamentals of modern web development...',
    excerpt: 'Learn the essential skills needed to become a successful web developer in 2024.',
    author: {
      id: '1',
      email: 'admin@blog.com',
      name: 'Admin User',
      role: 'admin',
      createdAt: '2024-01-01',
    },
    tags: ['Web Development', 'JavaScript', 'React'],
    coverImage: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1200',
    published: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    readTime: 8,
  },
  {
    id: '2',
    title: 'The Future of Artificial Intelligence',
    content: 'Artificial Intelligence is revolutionizing every industry...',
    excerpt: 'Discover how AI is shaping our future and what it means for businesses and individuals.',
    author: {
      id: '1',
      email: 'admin@blog.com',
      name: 'Admin User',
      role: 'admin',
      createdAt: '2024-01-01',
    },
    tags: ['AI', 'Technology', 'Future'],
    coverImage: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200',
    published: true,
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    readTime: 12,
  },
  {
    id: '3',
    title: 'Building Scalable Applications with Cloud Computing',
    content: 'Cloud computing has transformed how we build and deploy applications...',
    excerpt: 'Learn best practices for building scalable applications using cloud technologies.',
    author: {
      id: '1',
      email: 'admin@blog.com',
      name: 'Admin User',
      role: 'admin',
      createdAt: '2024-01-01',
    },
    tags: ['Cloud Computing', 'AWS', 'Scalability'],
    coverImage: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1200',
    published: true,
    createdAt: '2024-01-25T09:15:00Z',
    updatedAt: '2024-01-25T09:15:00Z',
    readTime: 10,
  },
];

export const BlogProvider: React.FC<BlogProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // Load posts from localStorage or use mock data
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(mockPosts);
      localStorage.setItem('blogPosts', JSON.stringify(mockPosts));
    }
  }, []);

  const savePosts = (newPosts: BlogPost[]) => {
    setPosts(newPosts);
    localStorage.setItem('blogPosts', JSON.stringify(newPosts));
  };

  const addPost = (postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'author'>) => {
    if (!user) return;

    const newPost: BlogPost = {
      ...postData,
      id: Date.now().toString(),
      author: user,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newPosts = [newPost, ...posts];
    savePosts(newPosts);
  };

  const updatePost = (id: string, postData: Partial<BlogPost>) => {
    const newPosts = posts.map(post =>
      post.id === id
        ? { ...post, ...postData, updatedAt: new Date().toISOString() }
        : post
    );
    savePosts(newPosts);
  };

  const deletePost = (id: string) => {
    const newPosts = posts.filter(post => post.id !== id);
    savePosts(newPosts);
  };

  const getPost = (id: string) => {
    return posts.find(post => post.id === id);
  };

  const getFeaturedPosts = () => {
    return posts.filter(post => post.published).slice(0, 3);
  };

  const value: BlogContextType = {
    posts,
    addPost,
    updatePost,
    deletePost,
    getPost,
    getFeaturedPosts,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};