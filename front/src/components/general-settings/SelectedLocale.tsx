import {Select} from 'antd';
import {ReactElement} from 'react';
import {useConfig} from '../../services/config.provider';

interface SelectedLocaleProps {

}

function SelectedLocale(props: SelectedLocaleProps) {
  const {config, setConfig} = useConfig();


  function options(): Array<ReactElement> {
    return (config?.params?.availableLocales || []).map((locale, index) => {
      return <Select.Option value={locale} key={index}>{locale}</Select.Option>
    })
  }

  function onLocaleSelect(locale: string): void {
    config.selectedLocale = locale;
    setConfig({...config});
  }


  return (
    <div>
      <label className={'selectLabel'} htmlFor="selected-locale">Selected Locale</label>
      <Select onSelect={onLocaleSelect}
              id='selected-locale'
              showSearch
              style={{width: '100%'}}
              value={config?.selectedLocale}
              placeholder={'Select Item'}
              filterOption={(input, option) =>
                option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }>
        {options()}
      </Select>
    </div>
  )
}

export default SelectedLocale;
