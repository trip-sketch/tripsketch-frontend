import { ViewProps } from "react-native";
import { styled } from "styled-components/native";

interface HeaderProps extends ViewProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

const Header = ({ left, center, right, ...props }: HeaderProps) => {
  return (
    <Layout {...props}>
      <LeftWrapper>{left}</LeftWrapper>
      <CenterWrapper>{center}</CenterWrapper>
      <RightWrapper>{right}</RightWrapper>
    </Layout>
  );
};

export default Header;

const Layout = styled.View`
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LeftWrapper = styled.View`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

const CenterWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;

const RightWrapper = styled.View`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  min-width: 30px;
`;
