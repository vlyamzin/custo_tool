import {useDebounce} from "../../../hooks/debounce.hook";
import {useEffect} from "react";
import {validateUrl} from "../../../services/util.service";
import {Input} from "antd";
import {ConfigContext} from "../../../services/config.provider";

interface GenericUrlInputProps<T> {
  prevValue: () => T;
  config: ConfigContext;
  changeItemValue: (value: T) => void;
  label: string;
  id: string;
}

function GenericUrlInput(props: GenericUrlInputProps<string>) {
  const {inputText, setInputText} = useDebounce(applyUrl, props.prevValue(), 500);

  useEffect(() => {
    setInputText(props.prevValue());
  }, [props.config.selectedLocale]);

  function applyUrl(url: string): void {
    if (validateUrl(url) || url.length === 0) {
      props.changeItemValue(url);
    }
  }

  return (
    <div>
      <label className={'selectLabel'} htmlFor={props.id}>{props.label}</label>
      <Input placeholder={'Address'}
             id={props.id}
             name={props.id}
             type={'url'}
             value={inputText}
             onChange={e => {
               setInputText(e.target.value);
             }}/>
    </div>
  )
}

export default GenericUrlInput;
