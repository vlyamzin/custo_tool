import {Button, Upload} from "antd";
import {environment} from "../../environment";
import {useFileUpload} from "../../hooks/file-upload.hook";

interface LogoProps {}

function Logo(props: LogoProps) {
  const [fileList, uploadFile] = useFileUpload("loginPageLogoUrl");

  return (
    <div>
      <Upload action={`${environment.baseUrl}file-upload`}
              accept={'.png,.jpg,.jpeg'}
              listType={'picture'}
              withCredentials={true}
              fileList={[...fileList]}
              maxCount={1}
              onChange={uploadFile}>
        <label className='selectLabel inline' style={{fontSize: '0.85rem'}} htmlFor="logo-upload">Logo:</label>
        <Button type={'primary'} id='logo-upload'>Upload</Button>
      </Upload>
    </div>
  )
}

export default Logo;
