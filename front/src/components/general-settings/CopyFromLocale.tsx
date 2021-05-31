import './CopyFromLocale.css';
import {Button, Select} from 'antd';
import {useConfig} from '../../services/config.provider';
import {ReactElement, useState} from 'react';
import platformService, {PlatformCustomization, PlatformCustomizationItem} from '../../services/platform.service';

interface CopyFromLocaleProps {

}

function CopyFromLocale(props: CopyFromLocaleProps) {
  const {config, setConfig, forceUpdate} = useConfig();
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
    // Customization config is a set of rules
    // Each rule has a list of locales and values pairs
    // Here we run through the list of rules
    for (let [type, configPart] of Object.entries(c)) {
      // Get a rule that match selected locale. Values from this config we will copy
      const configToCopy = configPart.find((item: PlatformCustomizationItem<string>) => item.locale === locale);
      // Go to the next rule in case this one does not have required locale
      if (!configToCopy) {
        continue;
      }
      // Check if a rule already has the locale that we are going to modify
      const configToUpdateIndex = configPart.findIndex((item: PlatformCustomizationItem<string>) => item.locale === config.selectedLocale);
      // if there is a rule, then update it
      if (configToUpdateIndex > -1) {
        configPart[configToUpdateIndex].value = configToCopy.value;
      } else {
        // otherwise create a new locale/value pair
        configPart.push({
          locale: config.selectedLocale,
          value: configToCopy.value
        })
      }
    }

    const res = await platformService.setCustomization(c, 'Unable to copy from selected locale');
    res && setConfig({...config});
    forceUpdate && forceUpdate();
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
