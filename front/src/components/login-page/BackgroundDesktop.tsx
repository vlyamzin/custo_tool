import {Button, Tooltip, Upload} from "antd";
import {environment} from "../../environment";
import {useFileUpload} from "../../hooks/file-upload.hook";
import {EyeInvisibleOutlined} from "@ant-design/icons";

interface BackgroundDesktopProps {

}

function BackgroundDesktop(props: BackgroundDesktopProps) {
  const [fileList, uploadFile, noImage] = useFileUpload("loginPageBackgroundImageDesktop");

  function onNoImageClick(event: Event): void {
    event.stopPropagation();
    noImage();
  }

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
        <Tooltip title={'Don\'t use image'}>
          <Button type={'default'}
                  id='no-image-desktop'
                  className='no-image'
                  onClick={(e: any) => onNoImageClick(e)}>
            <EyeInvisibleOutlined />
          </Button>
        </Tooltip>
      </Upload>
    </div>

  )
}

export default BackgroundDesktop;
