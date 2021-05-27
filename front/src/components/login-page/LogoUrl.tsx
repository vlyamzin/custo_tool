import {Input} from "antd";
import {validateUrl} from "../../services/util.service";
import {useConfigItem} from "../../hooks/config-item.hook";
import {useEffect} from "react";
import {useDebounce} from "../../hooks/debounce.hook";

interface LogoUrlProps {
}

function LogoUrl(props: LogoUrlProps) {
  const {changeItemValue, prevValue, config} = useConfigItem('loginPageLogoBackUrl', 'Logo URL');
  const {inputText, setInputText} = useDebounce(applyUrl, prevValue(), 500);

  useEffect(() => {
    setInputText(prevValue());
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
             value={inputText}
             onChange={e => {
               setInputText(e.target.value);
             }}/>
    </div>
  )
}

export default LogoUrl;
