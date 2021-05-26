import {Col, Row, RowProps} from "antd";
import Logo from "./Logo";
import LogoUrl from "./LogoUrl";
import LoginDesktopBgColor from "./LoginDesktopBgColor";
import LoginMobileBgColor from "./LoginMobileBdColor";
import BackgroundDesktop from "./BackgroundDesktop";
import BackgroundMobile from "./BackgroundMobile";
import SelectWithCustomValues from "../select-with-custom-values/SelectWithCustomValues";
import BackgroundPositionDesktop from "./BackgroundPositionDesktop";
import BackgroundPositionMobile from "./BackgroundPositionMobile";

interface LoginPageProps extends RowProps {
  className: string;
}

function LoginPage(props: LoginPageProps) {
  return (
    <Row gutter={[20, 16]} {...props}>
      <Col span={24}><h2>Login Page</h2></Col>
      <Col span={24} className={'no-padding'}>
        <Col span={12}><Logo /></Col>
      </Col>
      <Col span={24} className={'no-padding'}>
        <Col span={12}><LogoUrl /></Col>
      </Col>
      <Col span={12}><LoginDesktopBgColor /></Col>
      <Col span={12}><LoginMobileBgColor /></Col>
      <Col span={12}><BackgroundDesktop /></Col>
      <Col span={12}><BackgroundMobile /></Col>
      <Col span={12}><BackgroundPositionDesktop /></Col>
      <Col span={12}><BackgroundPositionMobile /></Col>
    </Row>
  )
}

export default LoginPage;
