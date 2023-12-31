import { API_PATH } from "../constants/path";
import axiosBase from "./axios";
import { getAccessToken } from "@utils/token";

export const getCommentData = async () => {
  try {
    const response = await axiosBase.get(API_PATH.COMMENT.GET.ALL);
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error: any) {
    throw new Error("Error");
  }
};

export const getCommentByTripId = async (tripId: string) => {
  const accessToken = await getAccessToken();
  if (accessToken) {
    try {
      const response = await axiosBase.get(
        `${API_PATH.COMMENT.GET.COMMENT_ID.replace(":tripId", tripId)}`
      );
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    } catch (error: any) {
      throw new Error("Error");
    }
  }
};

export const getGuestCommentByTripId = async (tripId: string) => {
  try {
    const response = await axiosBase.get(
      `${API_PATH.COMMENT.GET.COMMENT_GUEST_ID.replace(":tripId", tripId)}`
    );
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error) {
    throw new Error("Error");
  }
};

interface CommentData {
  tripId: string;
  content: string;
}

export const createComment = async (commentData: CommentData) => {
  const accessToken = await getAccessToken();
  try {
    const response = await axiosBase.post(
      API_PATH.COMMENT.POST.COMMENT,
      commentData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

interface ReplyCommentData {
  tripId: string;
  content: string;
  replyToNickname: string;
  parentId: string;
}

export const createReplyComment = async (
  replyCommentData: ReplyCommentData
) => {
  const accessToken = await getAccessToken();
  try {
    const updatedCommentData = {
      tripId: replyCommentData.tripId,
      content: replyCommentData.content,
      replyToNickname: replyCommentData.replyToNickname,
    };
    const response = await axiosBase.post(
      `${API_PATH.COMMENT.POST.RECOMMENT.replace(
        ":parentId",
        replyCommentData.parentId
      )}`,
      updatedCommentData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error) {
    throw new Error("Error");
  }
};

export const updateCommentLike = async (likeCommentId: string) => {
  try {
    const response = await axiosBase.patch(
      `${API_PATH.COMMENT.PATCH.COMMENT_LIKE.replace(":id", likeCommentId)}`
    );
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error) {
    throw new Error("Error");
  }
};

interface ReplyCommentLikeData {
  likeReplyCommentId: string;
  parentId: string;
}

export const updateReplyCommentLike = async (
  replyCommentData: ReplyCommentLikeData
) => {
  try {
    const response = await axiosBase.patch(
      `${API_PATH.COMMENT.PATCH.RECOMMENT_LIKE.replace(
        ":id",
        replyCommentData.likeReplyCommentId
      ).replace(":parentId", replyCommentData.parentId)}`
    );
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error) {
    throw new Error("Error");
  }
};

interface updateData {
  id: string;
  content: string;
}

export const updateComment = async (updateData: updateData) => {
  const accessToken = await getAccessToken();
  try {
    const response = await axiosBase.patch(
      `${API_PATH.COMMENT.PATCH.COMMENT_CONTENT.replace(":id", updateData.id)}`,
      {
        content: updateData.content,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error) {
    throw new Error("Error");
  }
};

interface updateReplyData {
  id: string;
  parentId: string;
  content: string;
}

export const updateReplyComment = async (updateReplyData: updateReplyData) => {
  const accessToken = await getAccessToken();
  try {
    const response = await axiosBase.patch(
      `${API_PATH.COMMENT.PATCH.RECOMMENT_CONTENT.replace(
        ":id",
        updateReplyData.id
      ).replace(":parentId", updateReplyData.parentId)}`,
      {
        content: updateReplyData.content,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error) {
    throw new Error("Error");
  }
};

export const deleteComment = async (id: string) => {
  const accessToken = await getAccessToken();
  try {
    const response = await axiosBase.delete(
      `${API_PATH.COMMENT.DELETE.COMMENT.replace(":id", id)}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error) {
    throw new Error("Error");
  }
};

interface deleteData {
  id: string;
  parentId: string;
}

export const deleteReplyComment = async (deleteData: deleteData) => {
  const accessToken = await getAccessToken();
  try {
    const response = await axiosBase.delete(
      `${API_PATH.COMMENT.DELETE.RECOMMENT.replace(
        ":id",
        deleteData.id
      ).replace(":parentId", deleteData.parentId)}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    throw new Error("Error");
  }
};
