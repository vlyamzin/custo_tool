import {Select} from "antd";
import {useConfigItem} from "../../hooks/config-item.hook";
import {useEffect, useState} from "react";

interface LoginFormThemeProps {
  
}

function LoginFormTheme(props: LoginFormThemeProps) {
  const {prevValue, changeItemValue, config} = useConfigItem('loginPageTextColorTheme', 'text color');
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
      <label className={'selectLabel'} htmlFor="login-theme">Login form theme</label>
      <Select value={theme} onChange={onChange} id={'login-theme'} placeholder={'Select theme'} style={{width: '100%'}}>
        <Select.Option value={'dark'} key={0}>dark</Select.Option>
        <Select.Option value={'light'} key={1}>light</Select.Option>
      </Select>
    </div>
  )
}

export default LoginFormTheme;
