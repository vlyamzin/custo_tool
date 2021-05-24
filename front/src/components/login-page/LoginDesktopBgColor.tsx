import ColorPicker from "../color-picker/ColorPicker";
import {useConfigItemReduce} from "../../hooks/config-item.hook";
import {useEffect, useState} from "react";
import {debounce} from "lodash-es";

interface LoginDesktopBgColorProps {

}

function LoginDesktopBgColor(props: LoginDesktopBgColorProps) {
  const {dispatch, prevValue, config} = useConfigItemReduce('loginPageBackgroundColorDesktop', 'desktop background color');
  const [color, setColor] = useState(prevValue());

  useEffect(() => {
    setColor(prevValue())
  }, [config.selectedLocale]);

  function onChange(color: string): void {
    setColor(color);
    debounce(() => dispatch(color), 1000)();
  }

  return (
    <div>
      <label className={'selectLabel'}>Background color desktop</label>
      <ColorPicker color={color} onChange={onChange} onClear={() => onChange('')}/>
    </div>
  )
}

export default LoginDesktopBgColor;
