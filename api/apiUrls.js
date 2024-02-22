/**
 * Centralized API endpoint URLs.
 * Organizes all API endpoints in a single location, making them easier to manage and update.
 * This includes routes for authentication, users, posts, and comments.
 */

export const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL; // Base URL for  API

const apiUrls = {
  // Authentication Routes
  login: `${apiBaseUrl}/auth/login`, // POST: User login
  register: `${apiBaseUrl}/auth/register`, // POST: User registration

  // User Routes
  getAllUsers: `${apiBaseUrl}/users`, // GET: Retrieve all users
  getUser: (userId) => `${apiBaseUrl}/users/${userId}`, // GET: Retrieve a specific user
  deleteUser: (userId) => `${apiBaseUrl}/users/${userId}`, // DELETE: Delete a user
  updateUser: (userId) => `${apiBaseUrl}/users/${userId}`, // PUT: Update a user
  followUser: (userId) => `${apiBaseUrl}/users/${userId}/follow`, // POST: Follow a user
  unfollowUser: (userId) => `${apiBaseUrl}/users/${userId}/unfollow`, // POST: Unfollow a user
  getFollowers: (userId) => `${apiBaseUrl}/users/${userId}/followers`, // GET: Get followers of a user
  getFollowing: (userId) => `${apiBaseUrl}/users/${userId}/following`, // GET: Get users followed by a user
  isFollowing: (userId) => `${apiBaseUrl}/users/${userId}/isFollowing`, // GET: Check if a user is following another user

  // Post Routes
  getAllPosts: `${apiBaseUrl}/posts`, // GET: Retrieve all posts
  getPostsOfUser: (userId) => `${apiBaseUrl}/users/${userId}/posts`, // GET: Retrieve posts of a specific user
  addPost: `${apiBaseUrl}/posts`, // POST: Add a new post
  editPost: (postId) => `${apiBaseUrl}/posts/${postId}`, // PUT: Edit a post
  deletePost: (postId) => `${apiBaseUrl}/posts/${postId}`, // DELETE: Delete a post
  getUpvoteCount: (postId) => `${apiBaseUrl}/posts/${postId}/upvote-count`, // GET: Get upvote count of a post
  upvotePost: (postId) => `${apiBaseUrl}/posts/${postId}/upvote`, // POST: Upvote a post
  getUserPostCount: (userId) => `${apiBaseUrl}/users/${userId}/posts/count`,

  // Comment Routes
  getAllComments: `${apiBaseUrl}/comments`, // GET: Retrieve all comments
  getCommentsOfPost: (postId) => `${apiBaseUrl}/posts/${postId}/comments`, // GET: Retrieve comments of a specific post
  addCommentToPost: (postId) => `${apiBaseUrl}/posts/${postId}/comments`, // POST: Add a comment to a post
  replyToComment: (commentId) => `${apiBaseUrl}/comments/${commentId}/reply`, // POST: Reply to a comment
  editComment: (commentId) => `${apiBaseUrl}/comments/${commentId}`, // PUT: Edit a comment

  // Additional endpoints can be added here
};

export default apiUrls;
