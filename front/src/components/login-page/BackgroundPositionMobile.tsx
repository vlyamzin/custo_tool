import {useConfigItem} from "../../hooks/config-item.hook";
import SelectWithCustomValues from "../select-with-custom-values/SelectWithCustomValues";
import {environment} from "../../environment";

interface BackgroundPositionMobileProps {

}

function BackgroundPositionMobile(props: BackgroundPositionMobileProps) {
  const tooltipMessage = `The position of the background image for MOBILE login page.
                          Ex: "top center", "top left", "bottom right", "25% 75%".
                          If not set, default value is "top center", meaning that the top of the image touches the 
                          top of the screen and it is horizontally centered.`;
  const {prevValue, changeItemValue} = useConfigItem('loginPageBackgroundPositionMobile', 'background position');

  return (
    <SelectWithCustomValues label={'Mobile background position'}
                            options={environment.bgPositionOptions}
                            value={prevValue()}
                            onChange={changeItemValue}
                            tooltip={tooltipMessage}/>
  )
}

export default BackgroundPositionMobile;
