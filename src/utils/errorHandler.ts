import { AxiosError } from "axios";
import { ERROR_MESSAGE } from "../constants/message";
import { errorToastMessage } from "./toastMessage";

type ErrorWithMessage = {
  message: string;
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return typeof error === "object" && error !== null && "message" in error;
}

/**
 * @description : 에러를 받아서 메세지를 추출하는 함수
 * @param error : 에러 unknown 타입
 * @author : 장윤수
 * @update : 2023-09-12,
 * @version 1.0,
 * @see None
 */
export function getErrorMessage(error: unknown) {
  if (isErrorWithMessage(error)) return error.message;
  return String(error);
}

export const isInstanceofAPIError = (error: unknown) => {
  return error instanceof AxiosError;
};

export const getStatusCodeFromAPIError = (error: unknown) => {
  if (!isInstanceofAPIError(error)) return null;
  const errorMessage = getErrorMessage(error);
  const statusCode =
    errorMessage.match(/\d+/g)?.join() &&
    Number(errorMessage.match(/\d+/g)?.join());
  return statusCode;
};

/**
 * @description : 에러를 받아서 콘솔로그에 띄우는 함수
 *
 * @param error : 에러 unknown 타입
 * @param message : 콘솔로그에 띄울 메세지 앞부분
 *
 * @author : 장윤수
 * @update : 2023-09-12,
 * @version 1.0.1, catch 블록안에서 throw 못해서 throw 로직 삭제
 * @see None,
 */
export function errorLoging(error: unknown, message: string) {
  const errorMessage = getErrorMessage(error);
  console.log(message, errorMessage);
}

/**
 * @description : 캐치 문 내에서 에러를 받아 문자열로 변환후 토스트 메시지로 띄우는 함수
 *
 * @param error : 에러 unknown 타입
 *
 * @author : 장윤수
 * @update : 2023-09-12,
 * @version 1.0.0,
 * @see None,
 */
export function errorToastMessageInCatch(error: unknown) {
  const errorMessage = getErrorMessage(error);
  errorToastMessage(errorMessage);
}
