import { styled } from "styled-components/native";
import { LINK } from "../../../constants/link";
import { colors } from "../../../constants/color";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../../types/RootStack";
import { resetDataInSecureStore } from "../../../utils/secureStore";
import { STORE_KEY } from "../../../constants/store";

import Header from "../../UI/header/Header";
import CommonHeaderLeft from "../../UI/header/HeaderLeft";
import PageLayout from "../../common/PageLayout";

const SETUP_PAGE_LIST = [
  {
    title: "푸시 알림 설정",
    screenName: LINK.PUSH_NOTIFICATION_SETUP_PAGE,
  },
  {
    title: "오픈소스 라이선스",
    screenName: LINK.OPENSOURCE_LICENCE_PAGE,
  },
  {
    title: "개인정보 처리방침",
    screenName: LINK.PRIVACY_POLICY_PAGE,
  },
  {
    title: "위치정보서비스 이용약관",
    screenName: LINK.LOCATION_POLICY_PAGE,
  },
  {
    title: "게시물 운영 정책",
    screenName: LINK.POST_MANAGEMENT_POLICY_PAGE,
  },
  {
    title: "계정 관리",
    screenName: LINK.ACCOUNT_MANAGEMENT_PAGE,
  },
];

const SetupPageCompnent = () => {
  const navigation = useNavigation<StackNavigation>();

  const handleLogout = () => {
    resetDataInSecureStore(STORE_KEY.ACCESS_TOKEN);
    resetDataInSecureStore(STORE_KEY.REFRESH_TOKEN);
    navigation.navigate(LINK.MAIN);
  };

  return (
    <PageLayout>
      <Header left={<CommonHeaderLeft title="개인정보 및 설정" />} />
      <SetupList>
        {SETUP_PAGE_LIST.map((item) => {
          return (
            <SetupItem
              key={item.title}
              // onPress={() => navigation.navigate(item.screenName)}
            >
              <SetupItemTitle>{item.title}</SetupItemTitle>
              <SetupItemLinkIcon
                source={require("../../../assets/images/nextIcon.png")}
              />
            </SetupItem>
          );
        })}
        <SetupItem onPress={handleLogout}>
          <LogoutText>로그아웃</LogoutText>
        </SetupItem>
      </SetupList>
    </PageLayout>
  );
};

export default SetupPageCompnent;

const SetupList = styled.View`
  display: flex;
  flex-direction: column;
`;

const SetupItem = styled.TouchableOpacity`
  padding: 16px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SetupItemTitle = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.mainFont};
`;

const SetupItemLinkIcon = styled.Image`
  width: 18px;
  height: 18px;
  object-fit: contain;
`;

const LogoutText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #d73131;
`;