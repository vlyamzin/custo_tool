import {Button} from "antd";
import {useState} from "react";
import {LoadingOutlined} from "@ant-design/icons";
import platformService from "../../services/platform.service";

interface ZipConfigProps {

}

function ZipConfig(props: ZipConfigProps) {
  const [loading, showSpinner] = useState(false);

  async function zip(): Promise<void> {
    showSpinner(true);
    await platformService.getCustomizationZip();
    showSpinner(false);
  }

  return (
    <Button type={"primary"} onClick={zip} size={"large"} >
      ZIP customization files
      {loading ? <LoadingOutlined /> : null}
    </Button>
  )
}

export default ZipConfig;
