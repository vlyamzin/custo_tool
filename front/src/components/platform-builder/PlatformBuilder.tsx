import './PlatformBuilder.css';
import GeneralSettings from '../general-settings/GeneralSettings';
import LoginPage from "../login-page/LoginPage";
import ExitPage from "../exit-page/ExitPage"
import SessionEndSettings from "../session-end-settings/SessionEndSettings";
import ZipConfig from "../zip-config/ZipConfig";

interface PlatformProps {
}

function PlatformBuilder(props: PlatformProps) {
  return (
    <div id={'builder-container'}>
      <GeneralSettings className='row-container' />
      <LoginPage className='row-container' />
      <ExitPage className='row-container'/>
      <SessionEndSettings className='row-container'/>
      <ZipConfig />
    </div>
  )
}

export default PlatformBuilder;
