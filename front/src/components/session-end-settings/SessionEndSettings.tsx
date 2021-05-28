import {Col, Row} from "antd";
import SurveyUrl from "./SurveyUrl";

interface SessionEndSettingsProps {
  className: string;
}

function SessionEndSettings(props: SessionEndSettingsProps) {
  return (
    <Row gutter={[20, 20]} {...props}>
      <Col span={24}><h2 className={'section-heading'}>Session End Settings</h2></Col>
      <Col span={24} className={'no-padding'}>
        <Col span={12}><SurveyUrl /></Col>
      </Col>
    </Row>
  )
}

export default SessionEndSettings;
