import {useFileUpload} from "../../hooks/file-upload.hook";
import {Button, Upload} from "antd";
import {environment} from "../../environment";

interface ExitBackgroundDesktopProps {

}

function ExitBackgroundDesktop(props: ExitBackgroundDesktopProps) {
  const [fileList, uploadFile] = useFileUpload("thanksPageBackgroundImageDesktop");

  return (
    <div>
      <Upload action={`${environment.baseUrl}file-upload`}
              accept={'.png,.jpg,.jpeg'}
              listType={'picture'}
              withCredentials={true}
              fileList={[...fileList]}
              maxCount={1}
              onChange={uploadFile}>
        <label className='selectLabel inline' style={{fontSize: '0.85rem'}} htmlFor="exit-bg-desktop-upload">Desktop background:</label>
        <Button type={'primary'} id='exit-bg-desktop-upload'>Upload Desktop</Button>
      </Upload>
    </div>
  )
}

export default ExitBackgroundDesktop;
