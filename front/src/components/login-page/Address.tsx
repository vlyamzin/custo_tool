import {useConfigItem} from "../../hooks/config-item.hook";
import GenericTextarea from "../generics/generic-textarea/GenericTextarea";

interface AddressProps {

}

function Address(props: AddressProps) {
  const {prevValue, config, changeItemValue} = useConfigItem('loginPageAddressText', 'address');
  const placeholder = `Ex: Tour D2\n17, Place des Reflets\n92400 COURBEVOIE`;
  const label = 'Address';
  const id = 'address';
  return GenericTextarea({prevValue, config, changeItemValue, placeholder, label, id})
}

export default Address;
