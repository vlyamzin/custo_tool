import {Button, Col, Input, Row} from 'antd';
import classNames from 'classnames';
import {ReactElement, useEffect, useState} from 'react';
import {validateUrl} from "../../services/util.service";
import {LoadingOutlined} from "@ant-design/icons";

interface DomainInputProps {
  url: string;
  onSubmit: (value: string) => void;
  isLoading: boolean;
}

function DomainInput (props: DomainInputProps): ReactElement {
  const invalidPlatformUrlMessage = 'Platform URL is not valid';
  const [domain, setDomain] = useState(props.url);

  const [validationError, showValidationError] = useState('');

  function validateAndSubmit() {
    const segments = domain.split('/');

    // if url does not have http(s):// prefix or domain name
    if (!validateUrl(domain)) {
      showValidationError(invalidPlatformUrlMessage);
      return;
    }

    segments.length = 3;
    showValidationError('');
    props.onSubmit(segments.join('/'));
  }

  return (
    <Row gutter={[20, 0]}>
      <Col span={24}>
        <label htmlFor="url">Platform URL</label>
      </Col>
      <Col span={12}>
        <Input name={'url'}
               placeholder={'https://platform.com'}
               value={domain}
               onChange={(e) => {
                 setDomain(e.target.value)
               }}/>
      </Col>
      <Col span={12}>
        <Button type={'primary'} disabled={domain?.length === 0} onClick={validateAndSubmit}>
          {props.isLoading ? 'Loading' : 'Load'}
          {props.isLoading ? <LoadingOutlined />  : null }
        </Button>
      </Col>
      <Col span={24}
           className={
             classNames('validation-msg ant-form-item-explain ant-form-item-explain-error',
               {'visible': validationError.length > 0}
             )}>
        <span>{validationError}</span>
      </Col>
    </Row>
  )
}

export default DomainInput;
