import {Col, Row, RowProps} from "antd";
import Logo from "./Logo";

interface LoginPageProps extends RowProps {
  className: string;
}

function LoginPage(props: LoginPageProps) {
  return (
    <Row gutter={[20, 7]} {...props}>
      <Col span={24}><h2>Login Page</h2></Col>
      <Col span={12}>
        <Logo />
      </Col>
    </Row>
  )
}

export default LoginPage;
