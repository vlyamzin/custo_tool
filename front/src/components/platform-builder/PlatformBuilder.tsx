import './PlatformBuilder.css';
import GeneralSettings from '../general-settings/GeneralSettings';
import LoginPage from "../login-page/LoginPage";

interface PlatformProps {
}

function PlatformBuilder(props: PlatformProps) {
  return (
    <div>
      <GeneralSettings className='row-container' />
      <LoginPage className='row-container' />
    </div>
  )
}

export default PlatformBuilder;
