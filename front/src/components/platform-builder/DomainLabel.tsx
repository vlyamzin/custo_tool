import {Button, Col, Row} from 'antd';

interface DomainLabelProps {
  url: string;
  onShowForm: () => void;
}

function DomainLabel(props: DomainLabelProps) {
  return (
    <Row gutter={[20, 0]}>
      <Col span={24}>
        <span>{props.url}</span>
        <Button type={'link'} onClick={() => { props.onShowForm() }}>change</Button>
      </Col>
    </Row>
  )
}

export default DomainLabel;
