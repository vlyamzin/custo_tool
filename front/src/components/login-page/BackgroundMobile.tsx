import {Button, Tooltip, Upload} from "antd";
import {environment} from "../../environment";
import {useFileUpload} from "../../hooks/file-upload.hook";
import {EyeInvisibleOutlined} from "@ant-design/icons";

interface BackgroundMobileProps {

}

function BackgroundMobile(props: BackgroundMobileProps) {
  const [fileList, uploadFile, noImage] = useFileUpload("loginPageBackgroundImageMobile");

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
        <label className='selectLabel inline' style={{fontSize: '0.85rem'}} htmlFor="bg-mobile-upload">Mobile background:</label>
        <Button type={'primary'} id='bg-mobile-upload'>Upload Mobile</Button>
        <Tooltip title={'Don\'t use image'}>
          <Button type={'default'}
                  id='no-image-mobile'
                  className='no-image'
                  onClick={(e: any) => onNoImageClick(e)}>
            <EyeInvisibleOutlined />
          </Button>
        </Tooltip>
      </Upload>
    </div>
  )
}

export default BackgroundMobile;
