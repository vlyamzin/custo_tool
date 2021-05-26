import {useConfigItem} from "../../hooks/config-item.hook";
import SelectWithCustomValues from "../select-with-custom-values/SelectWithCustomValues";
import {environment} from "../../environment";

interface BackgroundSizeDesktopProps {

}

function BackgroundSizeDesktop(props: BackgroundSizeDesktopProps) {
  const tooltipMessage = `The size of the background image for DESKTOP login page.
                          Ex: "cover", "contain", "50%"
                          If not set, default value is "cover", meaning that the image is scaled 
                          as large as possible without stretching the image.`;
  const {prevValue, changeItemValue} = useConfigItem('loginPageBackgroundSizeDesktop', 'background position');

  return (
    <SelectWithCustomValues label={'Desktop background size'}
                            options={environment.bgSizeOptions}
                            value={prevValue()}
                            onChange={changeItemValue}
                            tooltip={tooltipMessage}/>
  )
}

export default BackgroundSizeDesktop;
