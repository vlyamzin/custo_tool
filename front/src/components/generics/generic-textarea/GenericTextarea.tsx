import {useDebounce} from "../../../hooks/debounce.hook";
import {useEffect} from "react";
import TextArea from "antd/es/input/TextArea";
import {ConfigContext} from "../../../services/config.provider";

interface GenericTextareaProps<T> {
  prevValue: () => T;
  config: ConfigContext;
  changeItemValue: (value: T) => void;
  label: string;
  placeholder: string;
  id: string;
}

function GenericTextarea(props: GenericTextareaProps<string>) {
  const {inputText: address, setInputText: setAddress} = useDebounce<string>(onChange, decodeInput(props.prevValue()), 500);

  useEffect(() => {
    const str = props.prevValue();
    setAddress(decodeInput(str));
  }, [props.config.selectedLocale]);

  function decodeInput(str: string): string {
    return (str || '').replaceAll(/<br\s?\/>/gm, '\n');
  }

  function encodeInput(str: string): string {
    return (str || '').replaceAll(/\n/gm, '<br/>');
  }

  function onChange(value: string): void {
    const encodedValue = encodeInput(value);
    props.changeItemValue(encodedValue);
  }

  return (
    <div>
      <label className={'selectLabel'} htmlFor={props.id}>{props.label}</label>
      <TextArea value={address}
                name={props.id}
                id={props.id}
                onChange={e => setAddress(e.target.value)}
                allowClear
                placeholder={props.placeholder} autoSize={{minRows: 4, maxRows: 4}} />
    </div>
  )
}

export default GenericTextarea;
