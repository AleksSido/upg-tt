import { MouseEventHandler } from 'react';
import './button.scss';

interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: string | JSX.Element;
  buttonType?: "button" | "submit" | "reset";
}

export default function Button({ onClick, children, buttonType}:Props){
  const type = buttonType ? buttonType : 'button';
  return (
    <button type={type} className="button" onClick={onClick}>{children}</button>
  );
}
