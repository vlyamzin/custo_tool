import {ReactElement, useState} from 'react';
import platformService from '../../services/platform.service';
import {Button, Col, Input, notification, Row} from 'antd';
import classNames from 'classnames';
import './PlatformLoader.css'
import {useConfig} from '../../services/config.provider';

interface PlatformLoaderProps {

}

function PlatformLoader(props: PlatformLoaderProps): ReactElement {
  const invalidPlatformUrlMessage = 'Platform URL is not valid';
  const {config, setConfig} = useConfig();
  const [platformUrl, setPlatformUrl] = useState(config.platformUrl || '');
  const [validationError, showValidationError] = useState('');

  async function loadPlatforms(platformUrl: string): Promise<void> {
    const validUrl = validateUrl(platformUrl);
    if (!validUrl) {
      showValidationError(invalidPlatformUrlMessage);
      return;
    }

    setPlatformUrl(platformUrl);
    showValidationError('');
    try {
      const remoteConfig = await platformService.getCustomization(validUrl);
      if (remoteConfig) {
        setConfig(() => {
          return {
            status: 'loaded',
            platformUrl,
            ...remoteConfig
          }
        });
      }
      console.log(remoteConfig);
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
               value={platformUrl}
               onChange={(e) => {
                 setPlatformUrl(e.target.value)
               }}/>
      </Col>
      <Col span={12}>
        <Button type={'primary'} disabled={platformUrl.length === 0} onClick={() => {
          loadPlatforms(platformUrl)
        }}>Load</Button>
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

export default PlatformLoader;
