import {useMemo, useState} from "react";
import {UploadChangeParam} from "antd/es/upload";
import {environment} from "../environment";
import {useConfig} from "../services/config.provider";
import platformService, {PlatformCustomization} from "../services/platform.service";
import {UploadFile} from "antd/es/upload/interface";

type FileUploadHook = [UploadFile<any>[], (i: UploadChangeParam) => void];

export function useFileUpload(type: keyof PlatformCustomization): FileUploadHook {
  const {config, setConfig} = useConfig();
  const [fileList, setFile] = useState(getFileFromUrl());

  useMemo(() => {
    setFile([...getFileFromUrl()]);
  }, [config.selectedLocale])

  function getPathTail(path: string, delimiter: string): string {
    const tail = path.split(delimiter).pop();
    return tail || '';
  }

  function getFileFromUrl(): Array<any> {
    const logoUrl = config.customization[type].find(i => i.locale === config.selectedLocale);

    if (logoUrl && logoUrl.value.length > 0) {
      return [
        {
          uid: '-' + Math.floor(Math.random() * 100),
          name: getPathTail(logoUrl.value, '/'),
          status: 'done',
          url: `${environment.remote}/${logoUrl.value}`,
          thumbUrl: `${environment.remote}/${logoUrl.value}`
        }
      ]
    }

    return [];
  }

  function uploadFile(info: UploadChangeParam): void {
    // workaround for issue https://github.com/ant-design/ant-design/issues/2423
    setFile([...info.fileList]);

    if (info?.file.status === 'done') {
      let logo = config.customization[type].find(i => i.locale === config.selectedLocale);
      if (logo) {
        logo.value = info.file.response.path;
      } else {
        logo = {locale: config.selectedLocale as string, value: info.file.response.path};
        config.customization[type].push(logo);
      }

      platformService.setCustomizationPart(type, logo, 'Logo image was not set')
        .then(() => { setConfig({...config}); });
    }

    if (info?.file.status === 'removed') {
      const index = config.customization[type].findIndex(i => i.locale === config.selectedLocale);
      if (index > -1) {
        config.customization[type].splice(index, 1);
        setConfig({...config});
      }
    }
  }

  return [fileList, uploadFile];
}
