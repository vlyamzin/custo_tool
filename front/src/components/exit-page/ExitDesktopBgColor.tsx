import {useConfigItem} from "../../hooks/config-item.hook";
import GenericColorControl from "../generics/generic-color-control/GenericColorControl";

interface ExitDesktopBgColorProps {
  
}

function ExitDesktopBgColor(props: ExitDesktopBgColorProps) {
  const {changeItemValue, prevValue, config} = useConfigItem('thanksPageBackgroundColorDesktop', 'desktop background color');
  const label = 'Desktop background color';
  return GenericColorControl({changeItemValue, prevValue, config, label});
}

export default ExitDesktopBgColor;
