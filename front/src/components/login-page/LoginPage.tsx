import {Col, Row, RowProps} from "antd";
import Logo from "./Logo";
import LogoUrl from "./LogoUrl";

interface LoginPageProps extends RowProps {
  className: string;
}

function LoginPage(props: LoginPageProps) {
  return (
    <Row gutter={[20, 7]} {...props}>
      <Col span={24}><h2>Login Page</h2></Col>
      <Col span={24} >
        <Col span={12}><Logo /></Col>
      </Col>
      <Col span={24}>
        <Col span={12}><LogoUrl /></Col>
      </Col>
    </Row>
  )
}

export default LoginPage;
