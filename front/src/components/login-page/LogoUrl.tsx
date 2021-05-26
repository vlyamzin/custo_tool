import {Input} from "antd";
import {validateUrl} from "../../services/util.service";
import {useConfigItem} from "../../hooks/config-item.hook";
import {useEffect, useState} from "react";
import debounce from "lodash/debounce";

interface LogoUrlProps {
}

function LogoUrl(props: LogoUrlProps) {
  const {changeItemValue, prevValue, config} = useConfigItem('loginPageLogoBackUrl', 'Logo URL');
  const [state, setState] = useState(prevValue());

  useEffect(() => {
    setState(prevValue());
  }, [config.selectedLocale]);

  function applyUrl(url: string): void {
    if (validateUrl(url) || url.length === 0) {
      changeItemValue(url);
    }
  }

  return (
    <div>
      <label className={'selectLabel'} htmlFor="logo-url">Logo URL</label>
      <Input placeholder={'Address'}
             name={'logo-url'}
             type={'url'}
             value={state}
             onChange={e => {
               setState(e.target.value);
               debounce(() => { applyUrl(e.target.value) }, 500)();
             }}/>
    </div>
  )
}

export default LogoUrl;
