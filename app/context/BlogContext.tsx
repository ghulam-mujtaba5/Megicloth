"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
  tags: string[];
}

interface BlogContextType {
  posts: Post[];
  addPost: (post: Omit<Post, 'id' | 'date'>) => void;
  updatePost: (post: Post) => void;
  deletePost: (postId: string) => void;
  getPostById: (postId: string) => Post | undefined;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export function useBlog() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
}

const mockPosts: Post[] = [
  {
    id: 'post-1',
    title: 'The Ultimate Guide to Summer Fashion',
    content: 'Summer is here, and it\'s time to update your wardrobe...',
    author: 'Jane Doe',
    date: '2024-06-15T10:00:00Z',
    imageUrl: 'https://picsum.photos/seed/blogA/800/600',
    tags: ['Fashion', 'Summer', 'Style Guide'],
  },
  {
    id: 'post-2',
    title: '5 Must-Have Accessories for Every Occasion',
    content: 'Accessories can make or break an outfit...',
    author: 'John Smith',
    date: '2024-07-02T14:30:00Z',
    imageUrl: 'https://picsum.photos/seed/blogB/800/600',
    tags: ['Accessories', 'Fashion Tips'],
  },
];

export function BlogProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  const addPost = useCallback((postData: Omit<Post, 'id' | 'date'>) => {
    const newPost: Post = {
      ...postData,
      id: `post-${Date.now()}`,
      date: new Date().toISOString(),
    };
    setPosts(prev => [newPost, ...prev]);
  }, []);

  const updatePost = useCallback((updatedPost: Post) => {
    setPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p));
  }, []);

  const deletePost = useCallback((postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
  }, []);

  const getPostById = useCallback((postId: string) => {
    return posts.find(p => p.id === postId);
  }, [posts]);

  const value = { posts, addPost, updatePost, deletePost, getPostById };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
}
