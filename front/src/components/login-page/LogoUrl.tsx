import {useConfigItem} from "../../hooks/config-item.hook";
import GenericUrlInput from "../generics/generic-url-input/GenericUrlInput";

interface LogoUrlProps {
}

function LogoUrl(props: LogoUrlProps) {
  const {changeItemValue, prevValue, config} = useConfigItem('loginPageLogoBackUrl', 'Logo URL');
  const label = `Logo URL`;
  const id = `logo-url`;
  return GenericUrlInput({prevValue, changeItemValue, config, label, id});
}

export default LogoUrl;
