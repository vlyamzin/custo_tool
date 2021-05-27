import SelectWithCustomValues from "../select-with-custom-values/SelectWithCustomValues";
import {useConfigItem} from "../../hooks/config-item.hook";
import {environment} from "../../environment";
import {PlatformCustomization} from "../../services/platform.service";

interface BackgroundPositionDesktopProps {
  type: keyof PlatformCustomization;
  label: string;
  tooltipPart: string
}

function BackgroundPosition(props: BackgroundPositionDesktopProps) {
  const tooltipMessage = `The position of the background image for ${props.tooltipPart}.
                          Ex: "top center", "top left", "bottom right", "25% 75%".
                          If not set, default value is "top center", meaning that the top of the image touches the 
                          top of the screen and it is horizontally centered.`;
  const {prevValue, changeItemValue} = useConfigItem(props.type, 'background position');

  return (
    <SelectWithCustomValues label={props.label}
                            options={environment.bgPositionOptions}
                            value={prevValue()}
                            onChange={changeItemValue}
                            tooltip={tooltipMessage}/>
  )
}

export default BackgroundPosition;
