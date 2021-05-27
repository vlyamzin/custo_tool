import {useFileUpload} from "../../hooks/file-upload.hook";
import {Button, Upload} from "antd";
import {environment} from "../../environment";

interface ExitBackgroundMobileProps {

}

function ExitBackgroundMobile(props: ExitBackgroundMobileProps) {
  const [fileList, uploadFile] = useFileUpload("thanksPageBackgroundImageMobile");

  return (
    <div>
      <Upload action={`${environment.baseUrl}file-upload`}
              accept={'.png,.jpg,.jpeg'}
              listType={'picture'}
              withCredentials={true}
              fileList={[...fileList]}
              maxCount={1}
              onChange={uploadFile}>
        <label className='selectLabel inline' style={{fontSize: '0.85rem'}} htmlFor="exit-bg-mobile-upload">Mobile background:</label>
        <Button type={'primary'} id='exit-bg-mobile-upload'>Upload Mobile</Button>
      </Upload>
    </div>
  )
}

export default ExitBackgroundMobile;
