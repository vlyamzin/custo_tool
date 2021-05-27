import ColorPicker from "../color-picker/ColorPicker";
import {useConfigItem} from "../../hooks/config-item.hook";
import {useEffect, useState} from "react";
import {useDebounce} from "../../hooks/debounce.hook";

interface LoginDesktopBgColorProps {

}

function LoginDesktopBgColor(props: LoginDesktopBgColorProps) {
  const {changeItemValue, prevValue, config} = useConfigItem('loginPageBackgroundColorDesktop', 'desktop background color');
  const {inputText: color, setInputText: setColor} = useDebounce<string>(onChange, prevValue(), 500);

  useEffect(() => {
    setColor(prevValue())
  }, [config.selectedLocale]);

  function onChange(color: string): void {
    changeItemValue(color);
  }

  return (
    <div>
      <label className={'selectLabel'}>Desktop background color</label>
      <ColorPicker color={color} onChange={c => setColor(c) } onClear={() => setColor('')}/>
    </div>
  )
}

export default LoginDesktopBgColor;
