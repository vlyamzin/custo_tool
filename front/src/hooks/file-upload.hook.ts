import {useEffect, useState} from "react";
import {UploadChangeParam} from "antd/es/upload";
import {environment} from "../environment";
import {useConfig} from "../services/config.provider";
import platformService, {PlatformCustomization, PlatformCustomizationItem} from "../services/platform.service";
import {UploadFile} from "antd/es/upload/interface";

type FileUploadHook = [UploadFile<any>[], (i: UploadChangeParam) => void];

export function useFileUpload(type: keyof PlatformCustomization): FileUploadHook {
  const {config, setConfig} = useConfig();
  const [fileList, setFile] = useState(getFileFromUrl());

  useEffect(() => {
    setFile([...getFileFromUrl()]);
  }, [config.selectedLocale])

  function getPathTail(path: string, delimiter: string): string {
    const tail = path.split(delimiter).pop();
    return tail || '';
  }

  function getFileFromUrl(): Array<any> {
    const imageUrl = (config.customization[type] || []).find(i => i.locale === config.selectedLocale);

    if (imageUrl && imageUrl.value.length > 0) {
      return [
        {
          uid: '-' + Math.floor(Math.random() * 100),
          name: getPathTail(imageUrl.value, '/'),
          status: 'done',
          url: `${environment.remote}/${imageUrl.value}`,
          thumbUrl: `${environment.remote}/${imageUrl.value}`
        }
      ]
    }

    return [];
  }

  function addCustomizationItem(itemValue: string): PlatformCustomizationItem<any> {
    let customizationItem;
    // create config group if if does not exist
    if (!config.customization.hasOwnProperty(type)) {
      customizationItem = {locale: config.selectedLocale as string, value: itemValue};
      config.customization[type] = [customizationItem];
      return customizationItem;
    }

    customizationItem = config.customization[type].find(i => i.locale === config.selectedLocale);
    // update config item
    if (customizationItem) {
      customizationItem.value = itemValue;
    } else {
      // add new config item to the existing group
      customizationItem = {locale: config.selectedLocale as string, value: itemValue};
      config.customization[type].push(customizationItem);
    }

    return customizationItem;
  }

  function uploadFile(info: UploadChangeParam): void {
    // workaround for issue https://github.com/ant-design/ant-design/issues/2423
    setFile([...info.fileList]);

    // file has been uploaded
    // save file url to the config item
    if (info?.file.status === 'done') {
      const customizationItem = addCustomizationItem(info.file.response.path);

      platformService.setCustomizationPart(type, customizationItem, 'Image was not set')
        .then(() => { setConfig({...config}); });
    }

    // file has been removed
    // delete the record from the config
    if (info?.file.status === 'removed') {
      const index = config.customization[type].findIndex(i => i.locale === config.selectedLocale);
      platformService.deleteCustomizationPart(type, config.customization[type][index].locale, 'Image was not removed')
        .then(() => {
          if (index > -1) {
            config.customization[type].splice(index, 1);
            setConfig({...config});
          }
        });
    }
  }

  return [fileList, uploadFile];
}
