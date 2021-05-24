import {useRef} from "react";
import {Button, Input} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import './ColorPicker.css'

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
  onClear?: () => void
}

function ColorPicker(props: ColorPickerProps) {
  const input = useRef<Input>(null);

  return (
    <div className={'cp-container'}>
      <Input type={"color"}
             className={'selector'}
             ref={input}
             value={props.color} onChange={e => props.onChange(e.target.value)}/>
      <div className={'preview'} onClick={() => {
        input.current?.input.click();
      }}>
        {props.color
          ? props.color
          : <span className={'placeholder'}>Choose color</span>
        }
      </div>
      {props.color
        ? <Button type={"text"} icon={<CloseOutlined/>} onClick={props.onClear}/>
        : null
      }

    </div>
  )
}

export default ColorPicker;
