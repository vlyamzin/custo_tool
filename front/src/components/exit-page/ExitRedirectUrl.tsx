import {useConfigItem} from "../../hooks/config-item.hook";
import GenericUrlInput from "../generics/generic-url-input/GenericUrlInput";

interface ExitRedirectUrlProps {

}

function ExitRedirectUrl(props: ExitRedirectUrlProps) {
  const {changeItemValue, prevValue, config} = useConfigItem('thanksPageRedirectUrl', 'redirect URL');
  const label = `Redirect URL`;
  const id = `redirect-url`;
  return GenericUrlInput({prevValue, changeItemValue, config, label, id});
}

export default ExitRedirectUrl;
