import {Col, Row} from 'antd';
import AvailableLocales from './AvailableLocales';
import DefaultLocale from './DefaultLocale';

interface GeneralSettingsProps {

}

function GeneralSettings(props: GeneralSettingsProps) {
  return (
    <Row gutter={[20, 20]}>
      <Col span={24}><h2>General Settings</h2></Col>
      <Col span={12}>
        <AvailableLocales />
      </Col>
      <Col span={12}>
        <DefaultLocale />
      </Col>
    </Row>
  )
}

export default GeneralSettings;
