import Link from 'next/link'
import React from 'react'

const NavItem = ({path, name, Icon}) => {
    return (
        <div className="flex items-center group mt-1">
            <Icon className="text-xl text-logo group-hover:text-btn group-hover:animate-spin"/>
            <Link href={path}>
               <a className="ml-2 text-gray-500 group-hover:text-logo">{name}</a>
            </Link>
        </div>
    )
}

export default NavItem

