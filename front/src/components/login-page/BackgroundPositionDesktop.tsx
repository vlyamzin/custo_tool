import SelectWithCustomValues from "../select-with-custom-values/SelectWithCustomValues";
import {useConfigItemReduce} from "../../hooks/config-item.hook";
import {environment} from "../../environment";

interface BackgroundPositionDesktopProps {

}

function BackgroundPositionDesktop(props: BackgroundPositionDesktopProps) {
  const tooltipMessage = `The position of the background image for DESKTOP login page.
                          Ex: "top center", "top left", "bottom right", "25% 75%".
                          If not set, default value is "top center", meaning that the top of the image touches the 
                          top of the screen and it is horizontally centered.`;
  const {prevValue, dispatch} = useConfigItemReduce('loginPageBackgroundPositionDesktop', 'background position');

  return (
    <SelectWithCustomValues label={'Desktop background position'}
                            options={environment.bgPositionOptions}
                            value={prevValue()}
                            onChange={dispatch}
                            tooltip={tooltipMessage}/>
  )
}

export default BackgroundPositionDesktop;
