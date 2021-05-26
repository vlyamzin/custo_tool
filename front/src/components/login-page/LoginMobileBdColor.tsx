import ColorPicker from "../color-picker/ColorPicker";
import {useConfigItem} from "../../hooks/config-item.hook";
import {useEffect, useState} from "react";
import {debounce} from "lodash-es";

interface LoginMobileBgColorProps {

}

function LoginMobileBgColor(props: LoginMobileBgColorProps) {
  const {changeItemValue, prevValue, config} = useConfigItem('loginPageBackgroundColorMobile', 'mobile background color');
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
      <label className={'selectLabel'}>Mobile background color</label>
      <ColorPicker color={color} onChange={onChange} onClear={() => onChange('')}/>
    </div>
  )
}

export default LoginMobileBgColor;
