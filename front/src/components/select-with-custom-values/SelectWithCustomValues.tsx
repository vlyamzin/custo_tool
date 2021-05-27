import './SelectWithCustomValues.css'
import {Button, Input, Select, Tooltip} from "antd";
import {ChangeEvent, ReactElement, useState} from "react";
import {InfoCircleOutlined} from "@ant-design/icons";
import {useDebounce} from "../../hooks/debounce.hook";

interface SelectWithCustomValuesProps {
  tooltip?: string;
  label: string
  options: string[];
  value: string;
  onChange: (str: string) => void
}

function SelectWithCustomValues(props: SelectWithCustomValuesProps) {
  const [customView, toggleCustomView] = useState(false);
  const {inputText: customValue, setInputText: setCustomValue} = useDebounce<string>(props.onChange, props.value, 300)
  const items = props.options.map((l, i) => (
    <Select.Option value={l} key={i + 1}>{l}</Select.Option>
  ));
  items.unshift(<Select.Option className={'null-value'} value={''} key={0}>None</Select.Option>);

  function getInput(): ReactElement {
    const inputProps = {
      onChange: (event: ChangeEvent<HTMLInputElement>) => { setCustomValue(event.target.value) },
      value: customValue,
      placeholder: 'Type value'
    };

    return props.tooltip
      ? <Input type={'text'}
               {...inputProps}
               suffix={
                 <Tooltip title={props.tooltip}>
                   <InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}}/>
                 </Tooltip>
               }/>
      : <Input type={'text'} {...inputProps} />
  }

  function getControl(): ReactElement {
    return customView
      ? <div className={'container'}>
        {getInput()}
        <Button type={'link'} onClick={() => toggleCustomView(false)}>back</Button>
      </div>
      : <div className={'container'}>
        <Select
          className={'dropdown'}
          onSelect={props.onChange}
          value={props.value}
          placeholder={'Select Item'}>
          {items}
        </Select>
        <Button type={"link"} onClick={() => toggleCustomView(true)}>custom</Button>
      </div>
  }

  return (
    <div>
      <label className={'selectLabel'}>{props.label}</label>
      {getControl()}
    </div>
  )
}

export default SelectWithCustomValues;
