import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Share,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import useApiGet from "../../hooks/useApiGet";

import { Video } from "expo-av";
import CommentModal from "../comment/CommentModal";
import apiUrls from "../../api/apiUrls";
import useApiPost from "../../hooks/useApiPost";
import { router } from "expo-router";
import {
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
} from "date-fns";

const Post = ({ data, authorDetails }) => {
  const [upvotes, setUpvotes] = useState(data?.upvotes?.length);

  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);

  const [comments, setComments] = useState([]);
  const { postData, response, error: postError } = useApiPost();
  const [commentAdded, setCommentAdded] = useState(false);
  const [userHasUpvoted, setUserHasUpvoted] = useState(
    data?.upvotes?.find((upvoteId) => upvoteId === authorDetails?._id)
  );

  const { postData: postUpvote, response: upvoteResponse } = useApiPost();

  const {
    data: commentsData,
    getData: getComments,
    error: commentsError,
  } = useApiGet();

  const abortController = new AbortController();

  useEffect(() => {
    const get = async () => {
      await getComments(apiUrls.getCommentsOfPost(data._id));
    };
    get();
    setCommentAdded(false);
  }, [data._id, commentAdded]);

  useEffect(() => {
    console.log("commentsData: ", commentsData);

    if (commentsData) {
      setComments(commentsData);
    }
    if (commentsError) {
      console.error("Error fetching comments:", commentsError);
    }
  }, [commentAdded, commentsData, commentsError]);

  const handleComments = () => {
    setIsCommentModalVisible(true);
  };

  const closeCommentModal = () => {
    setIsCommentModalVisible(false);
  };

  const formatDate = (createdAt) => {
    const currentDate = new Date();
    const postDate = new Date(createdAt);

    // Calculate the differences in days, weeks, months, and years
    const daysDifference = differenceInDays(currentDate, postDate);
    const weeksDifference = differenceInWeeks(currentDate, postDate);
    const monthsDifference = differenceInMonths(currentDate, postDate);
    const yearsDifference = differenceInYears(currentDate, postDate);

    // Format the output based on the specified criteria
    if (yearsDifference > 0) {
      return `${yearsDifference} ${
        yearsDifference === 1 ? "year" : "years"
      } ago`;
    } else if (monthsDifference > 0) {
      return `${monthsDifference} ${
        monthsDifference === 1 ? "month" : "months"
      } ago`;
    } else if (weeksDifference > 0) {
      return `${weeksDifference} ${
        weeksDifference === 1 ? "week" : "weeks"
      } ago`;
    } else if (daysDifference > 0) {
      return `${daysDifference} ${daysDifference === 1 ? "day" : "days"} ago`;
    } else {
      return "today";
    }
  };

  const handleUpvote = async () => {
    if (userHasUpvoted) {
      setUpvotes((prev) => prev - 1);
    } else {
      setUpvotes((prev) => prev + 1);
    }
    setUserHasUpvoted(!userHasUpvoted);

    // Abort the previous API call
    abortController.abort();
    // Create a new AbortController for the latest API call
    const newAbortController = new AbortController();
    try {
      await postUpvote(apiUrls.upvotePost(data._id), {
        signal: newAbortController.signal,
      });
    } catch (error) {
      // Handle errors
      console.error("Error in upvoting post:", error);
    }
  };

  const onCommentSubmit = async (commentText) => {
    const optimisticComment = { id: "temp-id", content: commentText };
    setComments((prev) => [...prev, optimisticComment]);

    try {
      const response = await postData(apiUrls.addCommentToPost(data._id), {
        content: commentText,
      });
      if (response) {
        setComments((prev) =>
          prev.map((c) => (c.id === "temp-id" ? response?.newComment : c))
        );
      }
      setCommentAdded(true);
    } catch (error) {
      setComments((prev) => prev.filter((c) => c.id !== "temp-id"));
      console.error("Error submitting comment:", error);
      alert("Failed to submit comment");
    }
  };

  const onReplySubmit = async (commentId, reply) => {
    try {
      const response = await postData(apiUrls.replyToComment(commentId), {
        content: reply,
      });
      console.log("Reply submitted: ", response);
      // Handle successful reply here, such as updating the state to show the new reply
      await getComments(apiUrls.getCommentsOfPost(data._id));
    } catch (error) {
      console.error("Error in submitting reply: ", error);
      // Handle error here
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this post: ${data.content}`,
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const renderMedia = ({ item }) => {
    // if (item.endsWith(".mp4")) {
    //   return (
    //     <Video
    //     source={{ uri: `data:video/mp4;base64,${item}` }}
    //       style={styles.media}
    //       useNativeControls
    //       resizeMode="contain"
    //       isLooping
    //     />
    //   );
    // } else {
    return (
      <Image
        source={{ uri: `data:image/jpeg;base64,${item}` }}
        style={styles.media}
      />
    );
    // }
  };

  const placeholderImage = "https://via.placeholder.com/30";

  return (
    <View style={styles.postContainer}>
      <View style={styles.authorRow}>
        <TouchableOpacity
          onPress={() => router.push(`/publicProfile/${authorDetails._id}`)}
        >
          <Image
            source={{
              uri: `data:image/jpeg;base64,${authorDetails.profilePicture}`,
            }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.authorName}>{authorDetails.fullName}</Text>
          <Text style={styles.username}>@{authorDetails.username}</Text>
        </View>
      </View>
      <Text style={styles.dateText}>{formatDate(data.createdAt)}</Text>
      <Text style={styles.contentText}>{data.content}</Text>
      <FlatList
        data={[...data.images, ...data.videos]}
        renderItem={renderMedia}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionButton} onPress={handleUpvote}>
          <View
            style={[
              styles.thumbButton,
              {
                borderColor: userHasUpvoted ? "#4CAF50" : "grey",
                backgroundColor: userHasUpvoted ? "#4CAF50" : "transparent",
              },
            ]}
          >
            <AntDesign
              name="like2"
              size={18}
              color={userHasUpvoted ? "white" : "grey"}
            />
          </View>
          <Text style={styles.actionText}>{upvotes}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleComments}>
          <AntDesign
            name="message1"
            size={28}
            color="#007AFF"
            style={styles.actionIcon}
          />
          <Text style={styles.actionText}>{comments?.length}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <AntDesign
            name="sharealt"
            size={28}
            color="#4CAF50"
            style={styles.actionIcon}
          />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
      <CommentModal
        visible={isCommentModalVisible}
        onClose={closeCommentModal}
        comments={comments} // Pass comments data
        onCommentSubmit={onCommentSubmit} // Pass onCommentSubmit function
        onReplySubmit={onReplySubmit} // Pass onReplySubmit function
      />
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 15,
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  authorName: {
    fontWeight: "bold",
    color: "black",
  },
  username: {
    color: "grey",
  },
  dateText: {
    color: "grey",
    marginBottom: 5,
  },
  contentText: {
    marginBottom: 10,
    color: "black",
  },
  media: {
    width: 350,
    height: 350,
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  actionButton: {
    alignItems: "center",
  },
  actionIcon: {
    marginBottom: 3,
  },
  actionText: {
    fontSize: 12,
    color: "grey",
  },
  thumbButton: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Post;
