import {useConfigItem} from "../../hooks/config-item.hook";
import GenericTextarea from "../generics/generic-textarea/GenericTextarea";

interface ExitMessageProps {

}

function ExitMessage(props: ExitMessageProps) {
  const {prevValue, config, changeItemValue} = useConfigItem('thanksPageText', 'exit message');
  const placeholder = `Enter text here`;
  const label = 'Exit message';
  const id = 'exit-message';
  return GenericTextarea({prevValue, config, changeItemValue, placeholder, label, id})
}

export default ExitMessage;
