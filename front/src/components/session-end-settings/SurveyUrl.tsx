import {useConfigItem} from "../../hooks/config-item.hook";
import GenericUrlInput from "../generics/generic-url-input/GenericUrlInput";

interface SurveyUrlProps {

}

function SurveyUrl(props: SurveyUrlProps) {
  const {changeItemValue, prevValue, config} = useConfigItem('thanksPageFormUrl', 'survey URL');
  const label = `Survey URL`;
  const id = `survey-url`;
  return GenericUrlInput({prevValue, changeItemValue, config, label, id});
}

export default SurveyUrl;
