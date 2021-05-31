import './PlatformBuilder.css';
import GeneralSettings from '../general-settings/GeneralSettings';
import LoginPage from "../login-page/LoginPage";
import ExitPage from "../exit-page/ExitPage"
import SessionEndSettings from "../session-end-settings/SessionEndSettings";
import ZipConfig from "../zip-config/ZipConfig";
import {useConfig} from "../../services/config.provider";
import classNames from 'classnames';

interface PlatformProps {
}

function PlatformBuilder(props: PlatformProps) {
  const {config} = useConfig();

  return (
    <div id={'builder-container'}>
      <GeneralSettings className='row-container' />
      <LoginPage className={classNames('row-container', {'hidden': !config.selectedLocale})} />
      <ExitPage className={classNames('row-container', {'hidden': !config.selectedLocale})}/>
      <SessionEndSettings className={classNames('row-container', {'hidden': !config.selectedLocale})}/>
      <ZipConfig className={classNames('row-container', {'hidden': !config.selectedLocale})} />
    </div>
  )
}

export default PlatformBuilder;
