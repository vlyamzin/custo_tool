import {notification, Select} from 'antd';
import {useConfig} from '../../services/config.provider';
import {availableLocales} from '../../locales';
import platformService from '../../services/platform.service';

interface AvailableLocaleProps {
}

function AvailableLocale(props: AvailableLocaleProps) {
  const {config, setConfig} = useConfig();
  const items = availableLocales.map((l, i) => (
    <Select.Option value={l} key={i}>{l}</Select.Option>
  ));



  async function onLocaleSelect(locale: string): Promise<void> {
    const {availableLocales} = config.params;
    availableLocales.push(locale);
    const res = await platformService.setParams(availableLocales);
    if (res) {
      setConfig({...config});
    } else {
      notification.error({
        message: 'Synchronization error',
        description: 'Available locales were not set'
      })
    }
  }

  async function onLocaleDeselect(locale: string): Promise<void> {
    const {availableLocales, defaultLocale} = config.params;
    const index = availableLocales.findIndex(l => l === locale);
    if (availableLocales[index] === defaultLocale) {
      config.params.defaultLocale = '';
    }
    index > -1 && availableLocales.splice(index, 1);
    setConfig({...config});
  }

  return (
    <div>
      <label className={'selectLabel'} htmlFor="localeSelector">Available Locales</label>
      <Select mode={'multiple'}
              onSelect={onLocaleSelect}
              onDeselect={onLocaleDeselect}
              style={{width: '100%'}}
              defaultValue={config.params.availableLocales}
              placeholder={'Select Item'}>
        {items}
      </Select>
    </div>
  )
}

export default AvailableLocale;
