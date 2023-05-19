import React from "react"

const Header = () => {
    return (
        <div data-cy="header-background" className="bg-color-primary w-full h-105 lg:px-220 px-7 pt-38 pb-31">
            <h2 data-cy="header-title" className="text-2xl leading-9 text-white font-bold">To Do List App</h2>
        </div>
    )
}

export default Header