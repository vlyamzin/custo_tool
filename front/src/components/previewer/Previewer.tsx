import {environment} from '../../environment';
import {useEffect, useState} from 'react';
import './Previewer.css'
import {useConfig} from '../../services/config.provider';

interface IframeProps {
  reload: any;
}

function Previewer() {
  const [upd, reloadIframe] = useState({ r: 0 });
  const {config} = useConfig();
  useEffect(() => { reload() }, [config]);

  function reload(): void {
    reloadIframe({r: upd.r + 1})
  }

  function isHidden(): string {
    return config.status === 'loaded' ? '' : 'hidden';
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
