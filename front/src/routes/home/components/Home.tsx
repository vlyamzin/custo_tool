import {ReactElement, useState} from 'react';
import platformService from '../services/platform.service';
import {Button, Col, Input, notification, Row} from 'antd';
import classNames from 'classnames';
import './Home.css'
import {useHistory} from 'react-router-dom';

function Home(props: any): ReactElement {
  const invalidPlatformUrlMessage = 'Platform URL is not valid';
  const [platform, setPlatform] = useState('');
  const [validationError, showValidationError] = useState('');
  const route = useHistory();

  async function loadPlatforms(platformUrl: string): Promise<void> {
    const validUrl = validateUrl(platformUrl);
    if (!validUrl) {
      showValidationError(invalidPlatformUrlMessage);
      props.onLoadFinished(false);
      return;
    }

    setPlatform(platformUrl);
    showValidationError('');
    try {
      const custoFile = await platformService.getCustomization(validUrl);
      if (custoFile) {
        props.onLoadFinished(true);

        // navigate to platform route
        route.push('/platform/123');
      }
      console.log(custoFile);
    } catch (e) {
      notification.open({
        message: 'Connection Issue',
        type: 'error',
        description:
          'server error',
      });
    }
  }

  function validateUrl(url: string): string | null {
    const segments = url.split('/');
    const emailRegEx = /^http(s)?:\/\/(\S)+\.\w+(\.[\w])*(\/|\w)*$/g

    // if url does not have http(s):// prefix or domain name
    if (!emailRegEx.test(url)) {
      return null;
    }

    segments.length = 3;
    return segments.join('/');
  }


  return (
    <Row gutter={[20, 0]}>
      <Col span={24}>
        <label htmlFor="url">Platform URL</label>
      </Col>
      <Col span={12}>
        <Input name={'url'}
               placeholder={'https://platform.com'}
               onChange={(e) => { setPlatform(e.target.value) }} />
      </Col>
      <Col span={12}>
        <Button type={'primary'} disabled={platform.length === 0} onClick={() => { loadPlatforms(platform) }}>Load</Button>
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

export default Home;
