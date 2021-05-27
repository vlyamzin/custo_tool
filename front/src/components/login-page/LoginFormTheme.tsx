import {useConfigItem} from "../../hooks/config-item.hook";
import GenericFormTheme from "../generics/generic-form-theme/GenericFormTheme";

interface LoginFormThemeProps {
  
}

function LoginFormTheme(props: LoginFormThemeProps) {
  const {prevValue, changeItemValue, config} = useConfigItem('loginPageTextColorTheme', 'text color');
  const label = `Login form theme`;
  return GenericFormTheme({prevValue, changeItemValue, config, label});
}

export default LoginFormTheme;
