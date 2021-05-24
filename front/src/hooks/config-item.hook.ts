import platformService, {PlatformCustomization, PlatformCustomizationItem} from "../services/platform.service";
import {useConfig} from "../services/config.provider";

export function useConfigItemReduce(type: keyof PlatformCustomization, errorMsgPart: string) {
  let {config, setConfig} = useConfig();

  function getCustomizationItem(): PlatformCustomizationItem<any> | undefined {
    return (config.customization[type] || []).find(i => i.locale === config.selectedLocale);
  }

  function prevValue(): string {
    return getCustomizationItem()?.value || '';
  }

  function dispatch(value: string): void {
    if (value !== prevValue()) {
      if (!config.customization.hasOwnProperty(type)) {
        reduce(value, 'create');
      } else {
        value.length === 0 ? reduce(null, 'delete') : reduce(value, 'update');
      }
    }
  }

  async function reduce(value: any, action: string): Promise<void> {
    switch (action) {
      case 'create': {
        const item = {locale: config.selectedLocale as string, value: value};
        config.customization[type] = [item];
        const res = await platformService.setCustomizationPart(type, item, `Can't set ${errorMsgPart}`)
        res && setConfig({...config});
        break;
      }
      case 'update': {
        let item = getCustomizationItem();
        if (item) {
          item.value = value;
        } else {
          item = {locale: config.selectedLocale as string, value: value};
          config.customization[type].push(item);
        }
        const res = await platformService.setCustomizationPart(type, item, `Can't set ${errorMsgPart}`)
        res && setConfig({...config});
        break;
      }
      case 'delete': {
        const itemIndex = (config.customization[type] || []).findIndex(i => i.locale === config.selectedLocale);
        if (itemIndex > -1) {
          const res = await platformService.deleteCustomizationPart(
            type,
            config.selectedLocale as string,
            `Can't remove ${errorMsgPart}`);

          if (res) {
            config.customization[type].splice(itemIndex, 1);
            setConfig({...config});
          }
        }
        break;
      }
    }
  }

  return {prevValue, dispatch, config};
}
