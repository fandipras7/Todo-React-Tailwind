import React from "react";

interface CardProps {
    className: string;
    id?: number;
    componentName?: string;
    children: React.ReactNode;
    onClick?: VoidFunction;
}

const Card: React.FC<CardProps> = (props) => {
    return (
        <div data-cy={props.componentName} onClick={props.onClick} className={props.className} id={`itemTodo${props.id}`}>
            {props.children}
        </div>
    )
}

export default Card