import {Input} from "antd";
import {validateUrl} from "../../services/util.service";
import {useConfigItemReduce} from "../../hooks/config-item.hook";
import {useEffect, useState} from "react";
import debounce from "lodash/debounce";

interface LogoUrlProps {
}

function LogoUrl(props: LogoUrlProps) {
  const {dispatch, prevValue, config} = useConfigItemReduce('loginPageLogoBackUrl', 'Logo URL');
  const [state, setState] = useState(prevValue());

  useEffect(() => {
    setState(prevValue());
  }, [config.selectedLocale]);

  function applyUrl(url: string): void {
    if (validateUrl(url) || url.length === 0) {
      dispatch(url);
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
