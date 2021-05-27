import {useConfigItem} from "../../hooks/config-item.hook";
import {useEffect, useState} from "react";
import TextArea from "antd/es/input/TextArea";
import {useDebounce} from "../../hooks/debounce.hook";

interface AddressProps {

}

function Address(props: AddressProps) {
  const {prevValue, config, changeItemValue} = useConfigItem('loginPageAddressText', 'address');
  const {inputText: address, setInputText: setAddress} = useDebounce(onChange, decodeInput(prevValue()), 500);
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
    const encodedValue = encodeInput(value);
    changeItemValue(encodedValue);
  }

  return (
    <div>
      <label className={'selectLabel'} htmlFor="address">Address</label>
      <TextArea value={address}
                name={'address'}
                onChange={e => setAddress(e.target.value)}
                allowClear
                placeholder={placeholder} autoSize={{minRows: 4, maxRows: 4}} />
    </div>
  )
}

export default Address;
