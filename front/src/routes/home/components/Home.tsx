import {ReactElement, useState} from 'react';
import platformService from '../services/platform.service';
import classNames from 'classnames';

function Home(props: any): ReactElement {
  const [platform, setPlatform] = useState('');
  const [validationError, showValidationError] = useState('')

  async function loadPlatforms(platformUrl: string): Promise<void> {
    const validUrl = validateUrl(platformUrl);
    if (!validUrl) {
      return;
    }

    const custoFile = await platformService.getCustomization(validUrl);
    if (custoFile) {
      props.onLoadFinished();
    }
    console.log(custoFile);
  }

  function validateUrl(url: string): string | null {
    const segments = url.split('/');

    // if url does not have http(s):// prefix or domain name
    if (segments.length < 3 || segments[2].length === 0) {
      showValidationError('Platform URL is not valid');
      return null;
    }

    showValidationError('');
    segments.length = 3;
    return segments.join('/');
  }


  return (
    <div>
      <label htmlFor='platform-selector'>Platform URL</label>
      <input type='text' name='platform-selector' onChange={p => setPlatform(p.target.value)}/>
      <span className={classNames('invalid', {'is-visible': validationError.length > 0})}>{validationError}</span>
      <button disabled={platform.length === 0} onClick={() => loadPlatforms(platform)}>Load</button>
    </div>
  )
}

export default Home;
