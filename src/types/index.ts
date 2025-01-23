// Types for users
export interface User {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
}

// Types for user stats
export interface UserStats {
  timestamp: number;
  count: number;
}

// Types for API responses
export interface ApiResponse<T> {
  data: T;
  error?: string;
}
