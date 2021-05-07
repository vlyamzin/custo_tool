import {Select} from 'antd';
import {useConfig} from '../../services/config.provider';
import {ReactElement} from 'react';
import platformService from '../../services/platform.service';

interface DefaultLocaleProps {

}

function DefaultLocale(props: DefaultLocaleProps) {
  const {config, setConfig} = useConfig();

  function options(): Array<ReactElement> {
    return (config.params.availableLocales || []).map((locale, index) => {
        return <Select.Option value={locale} key={index}>{locale}</Select.Option>
    })
  }

  async function onLocaleSelect(locale: string): Promise<void> {
    config.params.defaultLocale = locale;
    const res = await platformService.setParams(
      {defaultLocale: config.params.defaultLocale},
      'Default locales was not set'
      );
    res && setConfig({...config});
  }

  return (
    <div>
      <label className={'selectLabel'} htmlFor="localeSelector">Available Locales</label>
      <Select onSelect={onLocaleSelect}
              showSearch
              style={{width: '100%'}}
              value={config.params.defaultLocale}
              placeholder={'Select Item'}
              filterOption={(input, option) =>
                option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }>
        {options()}
      </Select>
    </div>
  )
}

export default DefaultLocale;
