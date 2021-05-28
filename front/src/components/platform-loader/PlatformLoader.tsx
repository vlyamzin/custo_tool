import {ReactElement, useState} from 'react';
import platformService from '../../services/platform.service';
import '../general-settings/PlatformLoader.css'
import {useConfig} from '../../services/config.provider';
import DomainInput from './DomainInput';
import {notification} from 'antd';
import DomainLabel from './DomainLabel';

interface PlatformLoaderProps {

}

function PlatformLoader(props: PlatformLoaderProps): ReactElement {
  const {config, setConfig} = useConfig();
  const [loading, showSpinner] = useState(false);
  const [hideForm, changeFormVisibility] = useState(config.status === 'loaded');

  async function loadPlatforms(platformUrl: string): Promise<void> {
    if (loading) {
      return;
    }

    try {
      showSpinner(true);
      const remoteConfig = await platformService.getCustomization(platformUrl);
      showSpinner(false);
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
      showSpinner(false);
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
      : <DomainInput url={config.platformUrl} onSubmit={loadPlatforms} isLoading={loading} />
  )
}

export default PlatformLoader;
