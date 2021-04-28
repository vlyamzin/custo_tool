import classNames from 'classnames';
import {useState} from 'react';
import './Prompt.css'

interface PromptProps {
  name: string;
  label: string;
  buttonLabel: string;
  onSubmit: Function;
  validationError: string;
  defaultValue?: string;
  placeholder?: string
}

function Prompt(props: PromptProps) {
  const [text, setText] = useState(props.defaultValue || '');

  return (
    <div className={'prompt'}>
      <label htmlFor={props.name}>{props.label}</label>
      <input type='text' name={props.name} placeholder={props.placeholder || props.label} onChange={p => setText(p.target.value)}/>
      <button disabled={text.length === 0} onClick={() => props.onSubmit(text)}>{props.buttonLabel}</button>
      <span className={classNames('invalid', {'is-visible': props.validationError.length > 0})}>{props.validationError}</span>
    </div>
  )
}

export default Prompt;
