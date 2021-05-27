import {useConfigItem} from "../../hooks/config-item.hook";
import SelectWithCustomValues from "../select-with-custom-values/SelectWithCustomValues";
import {environment} from "../../environment";
import {PlatformCustomization} from "../../services/platform.service";

interface BackgroundSizeDesktopProps {
  type: keyof PlatformCustomization;
  label: string;
  tooltipPart: string
}

function BackgroundSize(props: BackgroundSizeDesktopProps) {
  const tooltipMessage = `The size of the background image for ${props.tooltipPart}.
                          Ex: "cover", "contain", "50%"
                          If not set, default value is "cover", meaning that the image is scaled 
                          as large as possible without stretching the image.`;
  const {prevValue, changeItemValue} = useConfigItem(props.type, 'background position');

  return (
    <SelectWithCustomValues label={props.label}
                            options={environment.bgSizeOptions}
                            value={prevValue()}
                            onChange={changeItemValue}
                            tooltip={tooltipMessage}/>
  )
}

export default BackgroundSize;
