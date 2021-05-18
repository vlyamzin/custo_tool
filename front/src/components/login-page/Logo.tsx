import {useConfig} from "../../services/config.provider";
import {Button, Upload} from "antd";
import {environment} from "../../environment";
import {RcFile, UploadChangeParam} from "antd/es/upload";
import {useMemo, useState} from "react";
import fileUploadService from "../../services/file-upload.service";
import {UploadFile} from "antd/es/upload/interface";

interface LogoProps {

}

function Logo(props: LogoProps) {
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
    const logoUrl = config.customization.loginPageLogoUrl.find(i => i.locale === config.selectedLocale);

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

  function removePrevFile(file: RcFile, fileList: Array<any>): boolean {
    // beforeUpload hook does not accept Promise<boolean> type
    // by this reason the next promise return value is ignored
    // just ask the server to drop previous file
    const logo = config.customization.loginPageLogoUrl.find(i => i.locale === config.selectedLocale);
    fileUploadService.deleteFile(logo?.value);
    return true;
  }

  async function onFileRemove(file: UploadFile): Promise<boolean> {
    const response = await fileUploadService.deleteFile(file.name);
    return response || false;
  }

  function onChange(info: UploadChangeParam): void {
    // workaround for issue https://github.com/ant-design/ant-design/issues/2423
    setFile([...info.fileList]);

    if (info?.file.status === 'done') {
      const logo = config.customization.loginPageLogoUrl.find(i => i.locale === config.selectedLocale);
      if (logo) {
        logo.value = info.file.response.path;
      }
      setConfig({...config});
    }
  }

  return (
    <div>
      <Upload action={`${environment.baseUrl}file-upload`}
              accept={'.png,.jpg,.jpeg'}
              listType={'picture'}
              withCredentials={true}
              fileList={[...fileList]}
              maxCount={1}
              beforeUpload={removePrevFile}
              onChange={onChange}
              onRemove={onFileRemove}
      >
        <label className='selectLabel inline' htmlFor="logo-upload">Logo:</label>
        <Button type={'primary'} id='logo-upload'>Upload</Button>
      </Upload>
    </div>
  )
}

export default Logo;
