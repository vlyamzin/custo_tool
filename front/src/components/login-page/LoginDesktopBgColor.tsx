import ColorPicker from "../color-picker/ColorPicker";
import {useConfigItem} from "../../hooks/config-item.hook";
import {useEffect, useState} from "react";
import {debounce} from "lodash-es";

interface LoginDesktopBgColorProps {

}

function LoginDesktopBgColor(props: LoginDesktopBgColorProps) {
  const {changeItemValue, prevValue, config} = useConfigItem('loginPageBackgroundColorDesktop', 'desktop background color');
  const [color, setColor] = useState(prevValue());

  useEffect(() => {
    setColor(prevValue())
  }, [config.selectedLocale]);

  function onChange(color: string): void {
    setColor(color);
    debounce(() => changeItemValue(color), 1000)();
  }

  return (
    <div>
      <label className={'selectLabel'}>Desktop background color</label>
      <ColorPicker color={color} onChange={onChange} onClear={() => onChange('')}/>
    </div>
  )
}

export default LoginDesktopBgColor;
