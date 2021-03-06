import {useConfigItem} from "../../hooks/config-item.hook";
import GenericColorControl from "../generics/generic-color-control/GenericColorControl";

interface LoginDesktopBgColorProps {

}

function LoginDesktopBgColor(props: LoginDesktopBgColorProps) {
  const {changeItemValue, prevValue, config} = useConfigItem('loginPageBackgroundColorDesktop', 'desktop background color');
  const label = 'Desktop background color';
  return GenericColorControl({changeItemValue, prevValue, config, label});
}

export default LoginDesktopBgColor;
