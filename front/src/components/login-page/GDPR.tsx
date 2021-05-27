import {useConfigItem} from "../../hooks/config-item.hook";
import {useDebounce} from "../../hooks/debounce.hook";
import RichTextEditor, {EditorValue} from "react-rte";
import {useEffect} from "react";

interface GDPRProps {

}

function GDPR(props: GDPRProps) {
  const {prevValue, changeItemValue, config} = useConfigItem('loginPageGrpdText', 'GDPR text');
  const {inputText: text, setInputText: setText} = useDebounce<EditorValue>(onChange, editorValueFactory(prevValue()), 500)

  useEffect(() => {
    const value = prevValue();
    setText(editorValueFactory(value));
  }, [config.selectedLocale]);

  function editorValueFactory(str: string): EditorValue {
    return str ? RichTextEditor.createValueFromString(str, 'html') : RichTextEditor.createEmptyValue();
  }

  function onChange(value: EditorValue): void {
    const str = value.toString('html');
    changeItemValue(str);
  }

  return (
    <div>
      <label className={'selectLabel'} htmlFor="gdpr">GDPR</label>
      <RichTextEditor value={text} onChange={value => setText(value)}/>
    </div>
  )
}

export default GDPR;
