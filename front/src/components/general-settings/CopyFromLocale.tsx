import './CopyFromLocale.css';
import {Button, Select} from 'antd';
import {useConfig} from '../../services/config.provider';
import {ReactElement, useState} from 'react';
import platformService, {PlatformCustomization, PlatformCustomizationItem} from '../../services/platform.service';

interface CopyFromLocaleProps {

}

function CopyFromLocale(props: CopyFromLocaleProps) {
  const {config, setConfig} = useConfig();
  const [locale, setLocale] = useState();

  function options(): Array<ReactElement> {
    return (config?.params?.availableLocales || [])
      .filter(l => l !== config.selectedLocale)
      .map((l, i) => {
        return <Select.Option value={l} key={i}>{l}</Select.Option>
      })
  }

  async function copy(): Promise<void> {
    const {customization: c} = config;
    for (let [type, configPart] of Object.entries(c)) {
      const configToCopy = configPart.find((item: PlatformCustomizationItem<string>) => item.locale === locale);
      if (!configToCopy) {
        continue;
      }
      const configToUpdateIndex = configPart.findIndex((item: PlatformCustomizationItem<string>) => item.locale === config.selectedLocale);
      if (configToUpdateIndex > -1) {
        configPart[configToUpdateIndex].value = configToCopy.value;
      } else {
        configPart.push({
          locale: config.selectedLocale,
          value: configToCopy.value
        })
      }
    }

    const res = await platformService.setCustomization(c, 'Unable to copy from selected locale');
    res && setConfig({...config});
  }

  return (
    <div>
      <label className={'selectLabel'} htmlFor="copy-from-locale">Copy from locale</label>
      <div id='container'>
        <Select onSelect={setLocale}
                onClear={() => {
                  setLocale(undefined)
                }}
                showSearch
                value={locale}
                placeholder={'Select Item'}
                allowClear
                filterOption={(input, option) =>
                  option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }>
          {options()}
        </Select>
        <Button id='copy-apply'
                type={'primary'}
                disabled={!locale}
                onClick={copy}>Apply</Button>
      </div>
    </div>
  )
}

export default CopyFromLocale;
