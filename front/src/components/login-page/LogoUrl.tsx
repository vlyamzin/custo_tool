import {useDebounce} from "../../hooks/debounce.hook";
import {useConfig} from "../../services/config.provider";
import {Input} from "antd";
import {validateUrl} from "../../services/util.service";
import platformService, {PlatformCustomizationItem} from "../../services/platform.service";

interface LogoUrlProps {
}

function LogoUrl(props: LogoUrlProps) {
  const {config, setConfig} = useConfig();
  const {inputText, setInputText, searchResults} = useDebounce(applyUrl, getPrevValue(), 1000);

  function getPrevValue(): string {
    const item = getCustomizationItem();
    return item?.value || '';
  }

  function addCustomizationItem(itemValue: string): PlatformCustomizationItem<any> {
    let customizationItem;
    if (!config.customization.hasOwnProperty('loginPageLogoBackUrl')) {
      customizationItem = {locale: config.selectedLocale as string, value: itemValue};
      config.customization.loginPageLogoBackUrl = [customizationItem];
      return customizationItem;
    }

    customizationItem = getCustomizationItem();
    customizationItem
      ? customizationItem.value = itemValue
      : customizationItem = {locale: config.selectedLocale as string, value: itemValue};
    config.customization.loginPageLogoBackUrl.push(customizationItem);

    return customizationItem;
  }

  async function applyUrl(url: string): Promise<void> {
    // add URL to selected locale
    if (validateUrl(url)) {
      const item = addCustomizationItem(url);
      const res = await platformService.setCustomizationPart('loginPageLogoBackUrl', item, `Can't set logo URL`);
      res && setConfig({...config});
    }

    // remove URL from selected locale
    if (url.length === 0) {
      const itemIndex = (config.customization.loginPageLogoBackUrl || []).findIndex(i => i.locale === config.selectedLocale);
      if (itemIndex > -1) {
        const res = await platformService.deleteCustomizationPart(
          'loginPageLogoBackUrl',
          config.selectedLocale as string,
          `Can't remove logo URL`);
        if (res) {
          config.customization.loginPageLogoBackUrl.splice(itemIndex, 1);
          setConfig({...config});
        }
      }
    }
  }

  function getCustomizationItem(): PlatformCustomizationItem<any> | undefined {
    return (config.customization.loginPageLogoBackUrl || []).find(i => i.locale === config.selectedLocale);
  }

  return (
    <div>
      <label className={'selectLabel'} htmlFor="logo-url">Logo URL</label>
      <Input placeholder={'Address'}
             name={'logo-url'}
             type={'url'}
             value={inputText}
             onChange={e => setInputText(e.target.value)}/>
    </div>
  )
}

export default LogoUrl;
