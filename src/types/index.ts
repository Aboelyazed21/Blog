export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  avatar?: string;
  createdAt: string;
}

export interface AttachedFile {
  url: string;
  type: string;
  name: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: User;
  tags: string[];
  coverImage?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  readTime: number;
  attachedFiles?: AttachedFile[];
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
  socialLogin: (provider: 'google' | 'facebook') => Promise<boolean>;
  loading: boolean;
}

export interface BlogContextType {
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'author'>) => void;
  updatePost: (id: string, post: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
  getPost: (id: string) => BlogPost | undefined;
  getFeaturedPosts: () => BlogPost[];
}