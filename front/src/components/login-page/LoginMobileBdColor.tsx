import ColorPicker from "../color-picker/ColorPicker";
import {useConfigItem} from "../../hooks/config-item.hook";
import {useEffect} from "react";
import {useDebounce} from "../../hooks/debounce.hook";

interface LoginMobileBgColorProps {

}

function LoginMobileBgColor(props: LoginMobileBgColorProps) {
  const {changeItemValue, prevValue, config} = useConfigItem('loginPageBackgroundColorMobile', 'mobile background color');
  const {inputText: color, setInputText: setColor} = useDebounce<string>(onChange, prevValue(), 500);

  useEffect(() => {
    setColor(prevValue())
  }, [config.selectedLocale]);

  function onChange(color: string): void {
    changeItemValue(color);
  }

  return (
    <div>
      <label className={'selectLabel'}>Mobile background color</label>
      <ColorPicker color={color} onChange={c => setColor(c) } onClear={() => setColor('')}/>
    </div>
  )
}

export default LoginMobileBgColor;
