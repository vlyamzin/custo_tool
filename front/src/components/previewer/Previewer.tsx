import {environment} from '../../environment';
import {ComponentProps, useEffect, useState} from 'react';
import './Previewer.css'
import {useConfig} from '../../services/config.provider';
import ActionButtons from "./ActionButtons";

interface IframeProps extends ComponentProps<any>{
  url: string;
}

interface PreviewerProps {
  toggleFullscreen: (status: boolean) => void;
}

function Previewer(props: PreviewerProps) {
  const [upd, reloadIframe] = useState({ r: 0 });
  const [mobileView, setMobileView] = useState(false);
  const [remoteUrl, setUrl] = useState(environment.remote);
  const {config} = useConfig();
  useEffect(() => { reload() }, [config]);

  function reload(): void {
    reloadIframe({r: upd.r + 1})
  }

  function goToLogin(): void {
    setUrl(environment.remote);
  }

  function goToExit(): void {
    setUrl(environment.remote + '/exit');
  }

  function isHidden(): string {
    return config.status === 'loaded' ? '' : 'hidden';
  }

  return (
    <aside className={isHidden()}>
      <ActionButtons fullscreenAction={props.toggleFullscreen}
                     reloadAction={reload}
                     mobileAction={() => setMobileView(true)}
                     desktopAction={() => setMobileView(false)}
                     loginAction={goToLogin}
                     exitAction={goToExit} />
      <div className="preview-wrapper">
        <Iframe key={upd.r} url={remoteUrl} className={mobileView ? 'mobile': null}/>
      </div>
    </aside>
  )
}

function Iframe(props: IframeProps) {
  return (
    <iframe src={props.url} width={'100%'} height={'100%'} frameBorder={0} {...props}></iframe>
  )
}

export default Previewer
