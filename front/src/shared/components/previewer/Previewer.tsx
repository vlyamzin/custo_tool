import {environment} from '../../../environment';
import {useEffect, useState} from 'react';
import './Previewer.css'

interface PreviewerProps {
  isPlatformLoaded: boolean;
}

interface IframeProps {
  reload: any;
}

function Previewer(props: PreviewerProps) {
  const [upd, reloadIframe] = useState({ r: 0 });
  // useEffect(() => { reload() }, [props.updateIframe]);

  function reload(): void {
    reloadIframe({r: upd.r + 1})
  }

  function isHidden(): string {
    return props.isPlatformLoaded ? '' : 'hidden';
  }

  return (
    <aside className={isHidden()}>
      <button onClick={() => reload()}>Refresh</button>
      <Iframe key={upd.r} reload={upd}/>
    </aside>
  )
}

function Iframe(props: IframeProps) {
  const remoteUrl = environment.remote;
  return (
    <iframe src={remoteUrl} width={'100%'} height={'100%'} frameBorder={0}></iframe>
  )
}

export default Previewer
