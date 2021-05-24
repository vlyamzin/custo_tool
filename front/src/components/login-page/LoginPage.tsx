import {Col, Row, RowProps} from "antd";
import Logo from "./Logo";
import LogoUrl from "./LogoUrl";
import LoginDesktopBgColor from "./LoginDesktopBgColor";
import LoginMobileBgColor from "./LoginMobileBdColor";

interface LoginPageProps extends RowProps {
  className: string;
}

function LoginPage(props: LoginPageProps) {
  return (
    <Row gutter={[20, 7]} {...props}>
      <Col span={24}><h2>Login Page</h2></Col>
      <Col span={24} style={{padding: 0}}>
        <Col span={12}><Logo /></Col>
      </Col>
      <Col span={24} style={{padding: 0}}>
        <Col span={12}><LogoUrl /></Col>
      </Col>
      <Col span={12}><LoginDesktopBgColor /></Col>
      <Col span={12}><LoginMobileBgColor /></Col>
    </Row>
  )
}

export default LoginPage;
