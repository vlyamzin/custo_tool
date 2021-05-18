import {Col, Row, RowProps} from 'antd';
import AvailableLocales from './AvailableLocales';
import DefaultLocale from './DefaultLocale';
import BasicStyleCheckbox from './BasicStyleCheckbox';
import SelectedLocale from './SelectedLocale';
import CopyFromLocale from './CopyFromLocale';

interface GeneralSettingsProps extends RowProps {
  className: string;
}

function GeneralSettings(props: GeneralSettingsProps) {
  return (
    <Row gutter={[20, 0]} {...props}>
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
      <Col span={12}>
        <SelectedLocale />
      </Col>
      <Col span={12}>
        <CopyFromLocale />
      </Col>
    </Row>
  )
}

export default GeneralSettings;
