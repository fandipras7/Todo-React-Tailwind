import React, { ReactNode } from "react";

interface ModalProps {
    show: boolean;
    children?: {
        header?: ReactNode,
        content?: ReactNode,
        footer?: ReactNode
    },
    wrapperClass?: string;
    underline?: boolean;
    onClick?: VoidFunction;
}

const Modal: React.FC<ModalProps> = (props) => {
    const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
      };
    
    return (
        <div onClick={props.onClick} className={`fixed flex items-center justify-center left-0 right-0 top-0 bottom-0 bg-black bg-opacity-50 ${props.show ? '' : 'hidden'}`}>
            <div className={props.wrapperClass} onClick={handleContentClick}>
                {props?.children?.header && (
                    <div>
                        {props.children.header}
                        <div className="mt-5 border border-solid border-gray-300"/>
                    </div>
                )}
                {props?.children?.content && (
                    <div>
                        {props.children.content}
                        {[props.underline] ?? <div className="mt-6 border border-solid border-gray-300"/> }
                    </div>
                )}
                {props?.children?.header && (
                    <div>{props.children.footer}</div>
                )}
            </div>
        </div>
    )
}

export default Modal