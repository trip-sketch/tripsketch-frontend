import { StyleSheet, Text, View } from "react-native";
import CommentItem from "./CommentItem";
import CommentNone from "./CommentNone";
import { Comment } from "../../../../types/comment";
import { GetPost } from "../../../../types/Post";
import { TouchableOpacity } from "react-native-gesture-handler";

type CommentProps = {
  onReplySubmit?: (
    comment: string,
    parentId: string,
    replyToNickname: string
  ) => void;
  sort: string;

  likeComment?: (likeCommentId: string, isLikeStatus: boolean) => void;
  likeReplyComment?: (
    likeCommentId: string,
    parentId: string,
    isLikeStatus: boolean
  ) => void;
  updateComment?: (updateCommentId: string, content: string) => void;
  updateReplyComment?: (
    updateReplyCommentId: string,
    parentId: string,
    content: string
  ) => void;
  deleteComment?: (id: string) => void;
  deleteReplyComment?: (id: string, parentId: string) => void;
  commentData: GetPost["tripAndCommentPairDataByTripId"]["second"];
  handleIconPress?: (index: number) => void;
};

const CommentList = ({
  sort,
  onReplySubmit,
  likeComment,
  likeReplyComment,
  updateComment,
  updateReplyComment,
  deleteComment,
  deleteReplyComment,
  commentData,
  handleIconPress,
}: CommentProps) => {
  // 댓글 10개까지 보여주는 함수
  const countPreviewComment = () => {
    let count = 0;
    const result = [];
    for (const item of commentData) {
      count += item.children.length + 1;
      result.push(item);

      // count가 10개 이상이면 순회 중지
      if (count >= 10) break;
    }
    return result;
  };

  // 댓글, 대댓글 카운트 함수
  const countComment = (commentData: Comment[]): number => {
    const commentCounts = commentData.length;
    const reCommentCounts = commentData
      .map((item) => {
        return item.children.length !== 0 ? item.children.length : 0;
      })
      .reduce((acc, cur) => (acc += cur), 0);
    return commentCounts + reCommentCounts;
  };

  return (
    <View style={styles.container}>
      <View style={styles.comment_title}>
        <Text>댓글</Text>
        <Text style={styles.comment_title_number}>
          {countComment(commentData)}
        </Text>
      </View>
      {commentData && commentData.length !== 0 ? (
        <View>
          {sort === "all" ? (
            <View style={styles.comment}>
              {commentData.map((item) => (
                <View key={item.id}>
                  <CommentItem
                    comment={item}
                    sort={sort}
                    onReplySubmit={onReplySubmit}
                    likeComment={likeComment}
                    likeReplyComment={likeReplyComment}
                    updateComment={updateComment}
                    updateReplyComment={updateReplyComment}
                    deleteComment={deleteComment}
                    deleteReplyComment={deleteReplyComment}
                  />
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.comment}>
              {countPreviewComment().map((item) => (
                <View key={item.id}>
                  <CommentItem
                    comment={item}
                    sort={sort}
                    onReplySubmit={onReplySubmit}
                    likeComment={likeComment}
                    likeReplyComment={likeReplyComment}
                    updateComment={updateComment}
                    updateReplyComment={updateReplyComment}
                    deleteComment={deleteComment}
                    deleteReplyComment={deleteReplyComment}
                  />
                </View>
              ))}
            </View>
          )}
        </View>
      ) : (
        <TouchableOpacity onPress={() => handleIconPress && handleIconPress(2)}>
          <CommentNone />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  comment_title: {
    paddingHorizontal: 20,
    marginTop: 4,
    marginBottom: 5,
    fontWeight: "600",
    display: "flex",
    flexDirection: "row",
    gap: 4,
  },
  comment_title_number: {
    fontWeight: "600",
  },
  comment: {},
  none_data: {},
});

export default CommentList;
