import {useConfigItem} from "../../hooks/config-item.hook";
import {useEffect, useState} from "react";
import TextArea from "antd/es/input/TextArea";
import {debounce} from "lodash-es";

interface AddressProps {

}

function Address(props: AddressProps) {
  const {prevValue, config, changeItemValue} = useConfigItem('loginPageAddressText', 'address');
  const [address, setAddress] = useState(decodeInput(prevValue()));
  const placeholder = `Ex: Tour D2\n17, Place des Reflets\n92400 COURBEVOIE`;

  useEffect(() => {
    const str = prevValue();
    setAddress(decodeInput(str));
  }, [config.selectedLocale]);

  function decodeInput(str: string): string {
    return (str || '').replaceAll(/<br\s?\/>/gm, '\n');
  }

  function encodeInput(str: string): string {
    return (str || '').replaceAll(/\n/gm, '<br/>');
  }

  function onChange(value: string): void {
    setAddress(value);
    const encodedValue = encodeInput(value);
    debounce(() => { changeItemValue(encodedValue) }, 1000)();
  }

  return (
    <div>
      <label className={'selectLabel'} htmlFor="address">Address</label>
      <TextArea value={address}
                onChange={e => onChange(e.target.value)}
                allowClear
                placeholder={placeholder} autoSize={{minRows: 4, maxRows: 4}} />
    </div>
  )
}

export default Address;
