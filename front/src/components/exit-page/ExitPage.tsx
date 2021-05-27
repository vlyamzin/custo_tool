import {Col, Row} from "antd";
import ExitDesktopBgColor from "./ExitDesktopBgColor";
import ExitMobileBgColor from "./ExitMobileBgColor";
import ExitBackgroundDesktop from "./ExitBackgroundDesktop";
import ExitBackgroundMobile from "./ExitBackgroundMobile";
import BackgroundPosition from "../background-position/BackgroundPosition";
import BackgroundSize from "../background-size/BackgroundSize";
import ExitFormTheme from "./ExitFormTheme";

interface ExitPageProps {
  className: string;
}

function ExitPage(props: ExitPageProps) {
  return (
    <Row gutter={[20, 16]} {...props}>
      <Col span={24}><h2>Exit Page</h2></Col>
      <Col span={12}><ExitDesktopBgColor /></Col>
      <Col span={12}><ExitMobileBgColor /></Col>
      <Col span={12}><ExitBackgroundDesktop /></Col>
      <Col span={12}><ExitBackgroundMobile /></Col>
      <Col span={12}>
        <BackgroundPosition type={'thanksPageBackgroundPositionDesktop'}
                            tooltipPart={'DESKTOP exit page'}
                            label={'Desktop background position'} />
      </Col>
      <Col span={12}>
        <BackgroundPosition type={'thanksPageBackgroundPositionMobile'}
                            tooltipPart={'MOBILE exit page'}
                            label={'Mobile background position'} />
      </Col>
      <Col span={12}>
        <BackgroundSize type={'thanksPageBackgroundSizeDesktop'}
                        tooltipPart={'DESKTOP login page'}
                        label={'Desktop background size'}/>
      </Col>
      <Col span={12}>
        <BackgroundSize type={'thanksPageBackgroundSizeMobile'}
                        tooltipPart={'MOBILE login page'}
                        label={'Mobile background size'}/>
      </Col>
      <Col span={24} className={'no-padding'}>
        <Col span={12}><ExitFormTheme /></Col>
      </Col>
    </Row>
  )
}

export default ExitPage;
