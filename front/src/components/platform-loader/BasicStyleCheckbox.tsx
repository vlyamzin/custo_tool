import {Checkbox} from 'antd';
import {CheckboxChangeEvent} from 'antd/es/checkbox';
import {useConfig} from '../../services/config.provider';
import platformService from '../../services/platform.service';

interface BasicStyleCheckboxProps {

}

function BasicStyleCheckbox(props: BasicStyleCheckboxProps) {
  const {config, setConfig} = useConfig();

  async function onChange(e: CheckboxChangeEvent): Promise<void> {
    config.params.oceBasicStyle = e.target.checked;
    const res = await platformService.setParams(
      {oceBasicStyle: config.params.oceBasicStyle},
      `Can't use OCE basic style`
    );

    res && setConfig({...config});
  }
  return (
    <Checkbox onChange={onChange}>Use OCE basic style</Checkbox>
  )
}

export default BasicStyleCheckbox;
