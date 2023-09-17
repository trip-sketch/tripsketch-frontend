import React, { useCallback, useRef, useMemo, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
  Text,
} from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import PostViewContainer from "./PostViewContainer";
import Comment from "./Comment";
import CommentBest from "./CommentBest";
import LikesAndCommentText from "./LikesAndCommentText";
import {
  useGetPostAndComments,
  useGetPostAndCommentsForGuest,
} from "../../hooks/usePostQuery";
import { useGetCurrentUser } from "../../hooks/useUserQuery";
import PostViewSkeleton from "./components/post/PostViewSkeleton";
import { GetPost } from "../../types/Post";

const PostDetailPageComponent = ({ postId }: { postId: string }) => {
  const { data: userData } = useGetCurrentUser();

  // 유저 로그인 시 보여지는 데이터
  const { postAndCommentData, isDataUserLoading, isDataUserError } =
    useGetPostAndComments(postId);

  // 게스트 접속 시 보여지는 데이터
  const { postAndCommentGuestData, isDataGuestLoading, isDataGuestError } =
    useGetPostAndCommentsForGuest(postId);

  // 바텀시트 높이 조절하는 변수
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["3%", "50%", "90%"], []);
  const [sheetIndex, setSheetIndex] = useState(0);

  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const handleSheetChange = useCallback((index: number) => {
    setSheetIndex(index);
    Animated.timing(overlayOpacity, {
      toValue: index >= 1 ? 0.5 : 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, []);

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  const checkUser: GetPost | undefined = userData
    ? postAndCommentData
    : postAndCommentGuestData;

  if (isDataUserLoading || isDataGuestLoading) {
    return <PostViewSkeleton />;
  }

  if (isDataUserError || isDataGuestError) {
    return <Text>에러</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerInner}>
        <ScrollView>
          <PostViewContainer
            postId={postId}
            postData={checkUser.tripAndCommentPairDataByTripId.first}
          />
          <LikesAndCommentText
            postId={postId}
            handleIconPress={(index) => handleSnapPress(index)}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleSnapPress(1)}
          >
            <CommentBest
              postId={postId}
              commentData={checkUser.tripAndCommentPairDataByTripId.second}
            />
          </TouchableOpacity>
        </ScrollView>
        {sheetIndex >= 1 && (
          <Animated.View
            style={[styles.overlay, { opacity: overlayOpacity }]}
          />
        )}
      </View>
      <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        style={styles.sheet}
      >
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          {checkUser && (
            <Comment
              postId={postId}
              commentData={checkUser.tripAndCommentPairDataByTripId.second}
            />
          )}
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInner: {
    backgroundColor: "white",
  },
  contentContainer: {
    backgroundColor: "white",
    position: "relative",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
  sheet: {
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    position: "relative",
    zIndex: 3,
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
});

export default PostDetailPageComponent;
