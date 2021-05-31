import {Select} from 'antd';
import {useConfig} from '../../services/config.provider';
import {availableLocales} from '../../locales';
import platformService, {PlatformCustomizationItem} from '../../services/platform.service';

interface AvailableLocaleProps {
}

function AvailableLocale(props: AvailableLocaleProps) {
  const {config, setConfig} = useConfig();
  const items = availableLocales.map((l, i) => (
    <Select.Option value={l} key={i}>{l}</Select.Option>
  ));

  function deleteCustomizationPart(locale: string): void {
    for (let [type, items] of Object.entries(config.customization)) {
      const index = items.findIndex((i: PlatformCustomizationItem<any>) => i.locale === locale);
      index && items.splice(index, 1);
    }
  }

  async function onLocaleSelect(locale: string): Promise<void> {
    const {availableLocales} = config.params;
    availableLocales.push(locale);
    const res = await platformService.setParams(config.params, 'Available locales were not set');
    res && setConfig({...config});
  }

  async function onLocaleDeselect(locale: string): Promise<void> {
    const {availableLocales, defaultLocale} = config.params;
    const index = availableLocales.findIndex(l => l === locale);
    if (availableLocales[index] === defaultLocale) {
      config.params.defaultLocale = '';
    }
    if (availableLocales[index] === config.selectedLocale) {
      config.selectedLocale = '';
    }
    index > -1 && availableLocales.splice(index, 1);
    deleteCustomizationPart(locale);
    const res = await Promise.all([
      platformService.setParams(config.params, 'Available locales were not unset'),
      platformService.setCustomization(config.customization, 'Available locales were not unset')
    ]);
    res && setConfig({...config});
  }

  return (
    <div>
      <label className={'selectLabel'} htmlFor="available-locales">Available Locales</label>
      <Select mode={'multiple'}
              id='available-locales'
              onSelect={onLocaleSelect}
              onDeselect={onLocaleDeselect}
              style={{width: '100%'}}
              defaultValue={config?.params?.availableLocales}
              placeholder={'Select Item'}>
        {items}
      </Select>
    </div>
  )
}

export default AvailableLocale;
