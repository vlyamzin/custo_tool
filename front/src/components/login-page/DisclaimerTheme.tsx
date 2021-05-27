import {Select} from "antd";
import {useConfigItem} from "../../hooks/config-item.hook";
import {useEffect, useState} from "react";

interface DisclaimerThemeProps {

}

function DisclaimerTheme(props: DisclaimerThemeProps) {
  const {prevValue, changeItemValue, config} = useConfigItem('loginPageLegalBackgroundColorTheme', 'background color');
  const [theme, setTheme] = useState(prevValue());

  useEffect(() => {
    setTheme(prevValue());
  }, [config.selectedLocale]);

  function onChange(color: string): void {
    setTheme(color);
    changeItemValue(color);
  }

  return (
    <div>
      <label className={'selectLabel'} htmlFor="disclaimer-theme">Disclaimer theme</label>
      <Select value={theme} onChange={onChange} id={'disclaimer-theme'} placeholder={'Select theme'} style={{width: '100%'}}>
        <Select.Option value={'dark'} key={0}>dark</Select.Option>
        <Select.Option value={'light'} key={1}>light</Select.Option>
      </Select>
    </div>
  )
}

export default DisclaimerTheme;
