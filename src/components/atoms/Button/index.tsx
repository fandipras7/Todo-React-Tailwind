import React from "react";

interface ButtonProps {
    className: string;
    children?: React.ReactNode
    componentName?: string;
    onClick?: VoidFunction;
    disable?: boolean
}

const Button: React.FC<ButtonProps> = (props) => {
    return <button disabled={props.disable} data-cy={props.componentName} className={props.className} onClick={props.onClick}>{props.children}</button>
}

export default Button