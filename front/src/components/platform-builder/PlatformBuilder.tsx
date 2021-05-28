import './PlatformBuilder.css';
import GeneralSettings from '../general-settings/GeneralSettings';
import LoginPage from "../login-page/LoginPage";
import ExitPage from "../exit-page/ExitPage"
import SessionEndSettings from "../session-end-settings/SessionEndSettings";

interface PlatformProps {
}

function PlatformBuilder(props: PlatformProps) {
  return (
    <div>
      <GeneralSettings className='row-container' />
      <LoginPage className='row-container' />
      <ExitPage className='row-container'/>
      <SessionEndSettings className='row-container'/>
    </div>
  )
}

export default PlatformBuilder;
