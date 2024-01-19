const dummyPosts = [
  {
    id: 1,
    username: "User1",
    userProfile: "https://via.placeholder.com/150",
    title: "First Post",
    media: "https://via.placeholder.com/300",
  },
  {
    id: 2,
    username: "User2",
    userProfile: "https://via.placeholder.com/150",
    title: "Exploring the City",
    media: "https://via.placeholder.com/300",
  },
  // ... More posts
];

// Generate additional dummy posts
for (let i = 3; i <= 20; i++) {
  dummyPosts.push({
    id: i,
    username: `User${i}`,
    userProfile: `https://via.placeholder.com/150?text=User${i}`,
    title: `Post Title ${i}`,
    media: `https://via.placeholder.com/300`,
  });
}

export default dummyPosts;
