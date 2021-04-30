import {ReactElement} from 'react';
import platformService from '../../services/platform.service';
import './PlatformLoader.css'
import {useConfig} from '../../services/config.provider';
import DomainInput from '../platform-builder/DomainInput';
import {notification} from 'antd';

interface PlatformLoaderProps {

}

function PlatformLoader(props: PlatformLoaderProps): ReactElement {
  const {config, setConfig} = useConfig();;

  async function loadPlatforms(platformUrl: string): Promise<void> {
    try {
      const remoteConfig = await platformService.getCustomization(platformUrl);
      if (remoteConfig) {
        setConfig(() => {
          return {
            status: 'loaded',
            platformUrl,
            ...remoteConfig
          }
        });
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
    <DomainInput url={config.platformUrl} onSubmit={loadPlatforms}/>
  )
}

export default PlatformLoader;
