import {useDebounce} from "../../../hooks/debounce.hook";
import {useEffect} from "react";
import ColorPicker from "../../color-picker/ColorPicker";
import {ConfigContext} from "../../../services/config.provider";

interface GenericColorControlProps<T> {
  prevValue: () => T;
  config: ConfigContext;
  changeItemValue: (value: T) => void;
  label: string;
}

function GenericColorControl(props: GenericColorControlProps<string>) {
  const {inputText: color, setInputText: setColor} = useDebounce<string>(onChange, props.prevValue(), 500);

  useEffect(() => {
    setColor(props.prevValue())
  }, [props.config.selectedLocale]);

  function onChange(color: string): void {
    props.changeItemValue(color);
  }

  return (
    <div>
      <label className={'selectLabel'}>{props.label}</label>
      <ColorPicker color={color} onChange={c => setColor(c) } onClear={() => setColor('')}/>
    </div>
  )
}

export default GenericColorControl;
