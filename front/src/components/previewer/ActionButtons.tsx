import './ActionButtons.css';
import {Button} from "antd";
import {
  DesktopOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  MobileOutlined,
  ReloadOutlined
} from "@ant-design/icons";
import {useState} from "react";

interface ActionButtonsProps {
  fullscreenAction: (status: boolean) => void;
  reloadAction: () => void;
  mobileAction: () => void;
  desktopAction: () => void;
  loginAction: () => void;
  exitAction: () => void;
}

function ActionButtons(props: ActionButtonsProps) {
  const [isFullscreen, toggleFullscreen] = useState(false);

  return (
    <div className={'container action-buttons'}>
      <div className="left">
        <Button type={"ghost"} onClick={props.loginAction}>Login</Button>
        <Button type={"ghost"} onClick={props.exitAction}>Exit</Button>
      </div>
      <div className="center">
        <Button type={"ghost"} icon={<MobileOutlined />} onClick={props.mobileAction} />
        <Button type={"ghost"} icon={<DesktopOutlined />} onClick={props.desktopAction}/>
      </div>
      <div className="right">
        <Button type={"ghost"} icon={<ReloadOutlined />} onClick={props.reloadAction} />
        <Button type={"ghost"} icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
                onClick={() => {
                  const status = !isFullscreen;
                  toggleFullscreen(status);
                  props.fullscreenAction(status)
                }}/>
      </div>
    </div>
  )
}

export default ActionButtons;
