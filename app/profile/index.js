import React from "react";
import UserProfile from "../../components/userProfile/UserProfile";
import FriendProfile from "../../components/friendProfile/friendProfile";

const dummyUserData = {
    profilePicture: 'https://via.placeholder.com/150',
    fullName: 'John Doe',
    username: 'johndoe123',
    posts: 34,
    followers: 120,
    following: 75,
    comments: 58,
    upvotes: 250,
    downvotes: 30,
    bio: 'Passionate about photography and travel. Living life one adventure at a time.',
    location: 'New York, USA',
  };
  

  const userData = {
    profilePicture: "https://via.placeholder.com/150",
    fullName: "Jane Doe",
    username: "janedoe",
    posts: 120,
    followers: 1045,
    following: 300,
    biography: "Love nature and photography. 🌿📸 Travel enthusiast. Based in New York.",
    location: "New York, USA"
};

const index = () => {
  return (
    <>
      {/* <UserProfile userData={dummyUserData}/> */}
      <FriendProfile userData={userData}/>
    </>
  );
};

export default index;
