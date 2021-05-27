import {Col, Row} from "antd";
import ExitDesktopBgColor from "./ExitDesktopBgColor";
import ExitMobileBgColor from "./ExitMobileBgColor";

interface ExitPageProps {
  className: string;
}

function ExitPage(props: ExitPageProps) {
  return (
    <Row gutter={[20, 16]} {...props}>
      <Col span={24}><h2>Exit Page</h2></Col>
      <Col span={12}><ExitDesktopBgColor /></Col>
      <Col span={12}><ExitMobileBgColor /></Col>
    </Row>
  )
}

export default ExitPage;
