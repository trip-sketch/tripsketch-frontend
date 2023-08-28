import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Comment } from "../../../types/comment";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import CommentInput from "./CommentInput";
import { User } from "../../../types/user";

type ReplyCommentProps = {
  recomment: Comment;
  userData: User;
  likeReplyComment?: (
    likeCommentId: string,
    parentId: string,
    isLikeStatus: boolean
  ) => void;
};

const ReCommentItem = ({
  recomment,
  userData,
  likeReplyComment,
}: ReplyCommentProps) => {
  const [likes, setLikes] = useState(recomment.isLiked);
  const [likeNum, setLikeNum] = useState(recomment.numberOfLikes);
  const [isButton, setIsButton] = useState(false);
  const [isUpdateInput, setIsUpdateInput] = useState(false);

  const likeReplyCommentId = recomment.id;
  const parentId = recomment.parentId;
  const isLikeStatus = likes;

  const handleLike = () => {
    if (likeReplyComment) {
      const updatedLikeStatus = !likes;
      likeReplyComment(likeReplyCommentId, parentId, isLikeStatus);
      setLikes(updatedLikeStatus);
      setLikeNum(updatedLikeStatus ? likeNum + 1 : likeNum - 1);
    }
  };

  const handleButton = () => {
    isButton ? setIsButton(false) : setIsButton(true);
    setIsUpdateInput(false);
  };

  const handleUpdate = () => {
    isUpdateInput ? setIsUpdateInput(false) : setIsUpdateInput(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.recomment_container}>
        <View style={styles.image}>
          <Image
            style={styles.profile}
            source={{ uri: recomment.userProfileUrl }}
          />
        </View>
        <View style={styles.info}>
          <View style={styles.top_container}>
            <View>
              <Text style={styles.nickname}>{recomment.userNickName}</Text>
              <Text style={styles.comment}>{recomment.content}</Text>
            </View>
            {userData && userData.nickname === recomment.userNickName ? (
              <TouchableOpacity onPress={handleButton}>
                <Entypo name="dots-three-vertical" size={14} color="#c5c5c5" />
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={styles.likes}>
            <Text>
              <TouchableOpacity onPress={handleLike}>
                <Ionicons
                  name={likes ? "md-heart-sharp" : "md-heart-outline"}
                  size={18}
                  color={likes ? "#ec6565" : "#777"}
                />
              </TouchableOpacity>
            </Text>
            <Text style={styles.likes_text}>{likeNum}</Text>
          </View>
        </View>
      </View>
      <View>
        {isUpdateInput ? (
          <View>
            <CommentInput />
          </View>
        ) : null}
      </View>
      <View>
        {userData && isButton ? (
          <View style={styles.button_container}>
            <TouchableOpacity
              style={styles.button_update}
              onPress={handleUpdate}
            >
              <Text style={styles.update_txt}>수정하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button_delete}>
              <Text style={styles.update_txt}>삭제하기</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  recomment_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  image: {
    width: 30,
    height: 30,
    backgroundColor: "#444",
    borderRadius: 30,
    overflow: "hidden",
  },
  profile: {
    width: 30,
    height: 30,
    resizeMode: "stretch",
  },
  info: {
    paddingLeft: 10,
    flex: 5,
  },
  top_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nickname: {
    fontSize: 13,
    fontWeight: "600",
  },
  comment: {
    fontSize: 13,
    color: "#6f6f6f",
  },
  likes: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
  },
  likes_text: {
    fontSize: 12,
    marginLeft: 2,
    color: "#777",
  },
  button_container: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "space-evenly",
    gap: 5,
  },
  button_update: {
    width: "50%",
    backgroundColor: "#73BBFB",
    paddingVertical: 10,
    borderRadius: 5,
  },
  update_txt: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 12,
  },
  button_delete: {
    width: "50%",
    textAlign: "center",
    backgroundColor: "#939393",
    paddingVertical: 10,
    borderRadius: 5,
  },
  delete_txt: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 12,
  },
});

export default ReCommentItem;
