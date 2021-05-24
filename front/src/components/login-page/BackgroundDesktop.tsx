import {Button, Upload} from "antd";
import {environment} from "../../environment";
import {useFileUpload} from "../../hooks/file-upload.hook";

interface BackgroundDesktopProps {

}

function BackgroundDesktop(props: BackgroundDesktopProps) {
  const [fileList, uploadFile] = useFileUpload("loginPageBackgroundImageDesktop");

  return (
    <div>
      <Upload action={`${environment.baseUrl}file-upload`}
              accept={'.png,.jpg,.jpeg'}
              listType={'picture'}
              withCredentials={true}
              fileList={[...fileList]}
              maxCount={1}
              onChange={uploadFile}>
        <label className='selectLabel inline' style={{fontSize: '0.85rem'}} htmlFor="bg-desktop-upload">Desktop background:</label>
        <Button type={'primary'} id='bg-desktop-upload'>Upload Desktop</Button>
      </Upload>
    </div>

  )
}

export default BackgroundDesktop;
