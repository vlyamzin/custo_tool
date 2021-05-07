import {PlatformCustomization, PlatformParams} from '../../services/platform.service';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import GeneralSettings from '../platform-loader/GeneralSettings';

interface PlatformProps {
  // customizationConfig: PlatformCustomization,
  // paramsConfig: PlatformParams
}

function PlatformBuilder(props: PlatformProps) {
  // const [config, updateConfig] = useState(props.customizationConfig);
  // const [params, updateParams] = useState(props.paramsConfig);
  return (
    <div>
      <GeneralSettings />
    </div>
  )
}

export default PlatformBuilder;
