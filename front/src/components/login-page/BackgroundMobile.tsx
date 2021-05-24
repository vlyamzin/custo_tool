import {Button, Upload} from "antd";
import {environment} from "../../environment";
import {useFileUpload} from "../../hooks/file-upload.hook";

interface BackgroundMobileProps {

}

function BackgroundMobile(props: BackgroundMobileProps) {
  const [fileList, uploadFile] = useFileUpload("loginPageBackgroundImageMobile");

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
      </Upload>
    </div>
  )
}

export default BackgroundMobile;
