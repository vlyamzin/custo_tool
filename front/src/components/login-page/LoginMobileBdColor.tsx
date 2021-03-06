import {useConfigItem} from "../../hooks/config-item.hook";
import GenericColorControl from "../generics/generic-color-control/GenericColorControl";

interface LoginMobileBgColorProps {

}

function LoginMobileBgColor(props: LoginMobileBgColorProps) {
  const {changeItemValue, prevValue, config} = useConfigItem('loginPageBackgroundColorMobile', 'mobile background color');
  const label = 'Mobile background color';
  return GenericColorControl({changeItemValue, prevValue, config, label});
}

export default LoginMobileBgColor;
