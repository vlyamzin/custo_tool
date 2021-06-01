import {Checkbox} from 'antd';
import {CheckboxChangeEvent} from 'antd/es/checkbox';
import {useConfig} from '../../services/config.provider';
import platformService from '../../services/platform.service';
import {useState} from "react";

interface BasicStyleCheckboxProps {

}

function BasicStyleCheckbox(props: BasicStyleCheckboxProps) {
  const {config, setConfig} = useConfig();
  const [state, setState] = useState(config.params.oceBasicStyle || true);

  async function onChange(e: CheckboxChangeEvent): Promise<void> {
    setState(e.target.checked);
    config.params.oceBasicStyle = e.target.checked;
    const res = await platformService.setParams(
      config.params,
      `Can't use OCE basic style`
    );

    res && setConfig({...config});
  }
  return (
    <Checkbox checked={state} onChange={onChange}>Use OCE basic style</Checkbox>
  )
}

export default BasicStyleCheckbox;
