import {useConfigItem} from "../../hooks/config-item.hook";
import GenericColorControl from "../generics/generic-color-control/GenericColorControl";

interface ExitMobileBgColorProps {

}

function ExitMobileBgColor(props: ExitMobileBgColorProps) {
  const {changeItemValue, prevValue, config} = useConfigItem('thanksPageBackgroundColorMobile', 'mobile background color');
  const label = 'Mobile background color';
  return GenericColorControl({changeItemValue, prevValue, config, label});
}

export default ExitMobileBgColor;
