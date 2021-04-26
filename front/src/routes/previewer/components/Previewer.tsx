import {environment} from '../../../environment';
import {useEffect, useState} from 'react';


function Previewer(props: any) {
  const [upd, reloadIframe] = useState({ r: 0 });
  useEffect(() => { reload() }, [props.updateIframe]);

  function reload(): void {
    reloadIframe({r: upd.r + 1})
  }

  return (
    <aside>
      <button onClick={() => reload()}>Refresh</button>
      <Iframe key={upd.r} reload={upd}/>
    </aside>
  )
}

function Iframe(props: any) {
  const remoteUrl = environment.remote;
  return (
    <iframe src={remoteUrl} width={'100%'} height={'100%'} frameBorder={0}></iframe>
  )
}

export default Previewer
