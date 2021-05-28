import {Col, Row, RowProps} from "antd";
import Logo from "./Logo";
import LogoUrl from "./LogoUrl";
import LoginDesktopBgColor from "./LoginDesktopBgColor";
import LoginMobileBgColor from "./LoginMobileBdColor";
import BackgroundDesktop from "./BackgroundDesktop";
import BackgroundMobile from "./BackgroundMobile";
import BackgroundPosition from "../background-position/BackgroundPosition";
import BackgroundSize from "../background-size/BackgroundSize";
import Address from "./Address";
import Disclaimer from "./Disclaimer";
import DisclaimerTheme from "./DisclaimerTheme";
import LoginFormTheme from "./LoginFormTheme";
import GDPR from "./GDPR";

interface LoginPageProps extends RowProps {
  className: string;
}

function LoginPage(props: LoginPageProps) {
  return (
    <Row gutter={[20, 20]} {...props}>
      <Col span={24}><h2 className={'section-heading'}>Login Page</h2></Col>
      <Col span={24} className={'no-padding'}>
        <Col span={12}><Logo /></Col>
      </Col>
      <Col span={24} className={'no-padding'}>
        <Col span={12}><LogoUrl /></Col>
      </Col>
      <Col span={12}><LoginDesktopBgColor /></Col>
      <Col span={12}><LoginMobileBgColor /></Col>
      <Col span={12}><BackgroundDesktop /></Col>
      <Col span={12}><BackgroundMobile /></Col>
      <Col span={12}>
        <BackgroundPosition type={'loginPageBackgroundPositionDesktop'}
                            tooltipPart={'DESKTOP login page'}
                            label={'Desktop background position'}/>
      </Col>
      <Col span={12}>
        <BackgroundPosition type={'loginPageBackgroundPositionMobile'}
                            tooltipPart={'MOBILE login page'}
                            label={'Mobile background position'} />
      </Col>
      <Col span={12}>
        <BackgroundSize type={'loginPageBackgroundSizeDesktop'}
                        tooltipPart={'DESKTOP login page'}
                        label={'Desktop background size'}/>
      </Col>
      <Col span={12}>
        <BackgroundSize type={'loginPageBackgroundSizeMobile'}
                        tooltipPart={'MOBILE login page'}
                        label={'Mobile background size'}/>
      </Col>
      <Col span={24}><Address /></Col>
      <Col span={24}><Disclaimer /></Col>
      <Col span={24} className={'no-padding'}>
        <Col span={12}><DisclaimerTheme /></Col>
      </Col>
      <Col span={24} className={'no-padding'}>
        <Col span={12}><LoginFormTheme /></Col>
      </Col>
      <Col span={24}><GDPR /></Col>
    </Row>
  )
}

export default LoginPage;
