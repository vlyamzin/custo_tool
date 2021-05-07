import {ReactElement, useState} from 'react';
import platformService from '../../services/platform.service';
import './PlatformLoader.css'
import {useConfig} from '../../services/config.provider';
import DomainInput from '../platform-builder/DomainInput';
import {notification} from 'antd';
import DomainLabel from '../platform-builder/DomainLabel';

interface PlatformLoaderProps {

}

function PlatformLoader(props: PlatformLoaderProps): ReactElement {
  const {config, setConfig} = useConfig();
  const [hideForm, changeFormVisibility] = useState(config.status === 'loaded');

  async function loadPlatforms(platformUrl: string): Promise<void> {
    try {
      const remoteConfig = await platformService.getCustomization(platformUrl);
      if (remoteConfig) {
        setConfig({
          status: 'loaded',
          selectedLocale: remoteConfig.params.defaultLocale,
          platformUrl,
          ...remoteConfig
        });
        changeFormVisibility(true);
      }
    } catch (e) {
      notification.open({
        message: 'Connection Issue',
        type: 'error',
        description:
          'server error',
      });
    }
  }

  return (
    hideForm
      ? <DomainLabel url={config.platformUrl} onShowForm={() => { changeFormVisibility(false) }}/>
      : <DomainInput url={config.platformUrl} onSubmit={loadPlatforms}/>
  )
}

export default PlatformLoader;
