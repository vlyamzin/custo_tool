import './PlatformBuilder.css';
import GeneralSettings from '../general-settings/GeneralSettings';
import LoginPage from "../login-page/LoginPage";
import ExitPage from "../exit-page/ExitPage"

interface PlatformProps {
}

function PlatformBuilder(props: PlatformProps) {
  return (
    <div>
      <GeneralSettings className='row-container' />
      <LoginPage className='row-container' />
      <ExitPage className='row-container'/>
    </div>
  )
}

export default PlatformBuilder;
