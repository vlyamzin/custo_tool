import {PlatformCustomization, PlatformParams} from '../../services/platform.service';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';

interface PlatformProps {
  // customizationConfig: PlatformCustomization,
  // paramsConfig: PlatformParams
}

function PlatformBuilder(props: PlatformProps) {
  // const [config, updateConfig] = useState(props.customizationConfig);
  // const [params, updateParams] = useState(props.paramsConfig);
  return (
    <div>
      <button onClick={() => {
      }}>Back</button>
    </div>
  )
}

export default PlatformBuilder;
