import {Col, Row} from 'antd';
import AvailableLocales from './AvailableLocales';
import DefaultLocale from './DefaultLocale';
import BasicStyleCheckbox from './BasicStyleCheckbox';

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
      <Col span={24}>
        <BasicStyleCheckbox />
      </Col>
    </Row>
  )
}

export default GeneralSettings;
