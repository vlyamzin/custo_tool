import {useConfigItem} from "../../hooks/config-item.hook";
import GenericFormTheme from "../generics/generic-form-theme/GenericFormTheme";

interface ExitFormThemeProps {

}

function ExitFormTheme(props: ExitFormThemeProps) {
  const {prevValue, changeItemValue, config} = useConfigItem('thanksPageContainerColorTheme', 'text color');
  const label = `Exit form theme`;
  return GenericFormTheme({prevValue, changeItemValue, config, label});
}

export default ExitFormTheme;
