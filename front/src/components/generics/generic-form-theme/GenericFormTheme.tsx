import {Select} from "antd";
import {useEffect, useState} from "react";
import {ConfigContext} from "../../../services/config.provider";

interface GenericFormThemeProps<T> {
  prevValue: () => T;
  config: ConfigContext;
  changeItemValue: (value: T) => void;
  label: string;
}

function GenericFormTheme(props: GenericFormThemeProps<string>) {
  const [theme, setTheme] = useState(props.prevValue());

  useEffect(() => {
    setTheme(props.prevValue());
  }, [props.config.selectedLocale]);

  function onChange(color: string): void {
    setTheme(color);
    props.changeItemValue(color);
  }

  return (
    <div>
      <label className={'selectLabel'}>{props.label}</label>
      <Select value={theme} onChange={onChange} placeholder={'Select theme'} style={{width: '100%'}}>
        <Select.Option value={'dark'} key={0}>dark</Select.Option>
        <Select.Option value={'light'} key={1}>light</Select.Option>
      </Select>
    </div>
  )
}

export default GenericFormTheme;
