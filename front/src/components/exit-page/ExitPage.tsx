import {Col, Row} from "antd";

interface ExitPageProps {
  className: string;
}

function ExitPage(props: ExitPageProps) {
  return (
    <Row gutter={[20, 16]} {...props}>
      <Col span={24}><h2>Exit Page</h2></Col>
    </Row>
  )
}

export default ExitPage;
