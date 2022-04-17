import Link from 'next/link'
import React from 'react'

const SocialsItem = ({path, name, Icon}) => {
    return (
        <div className="flex items-center group mt-1 group">
            <Icon className="group-hover:animate-spin text-xl text-logo group-hover:text-btn"/>
            <Link href={path}>
               <a className="ml-2 text-gray-500 group-hover:text-logo">{name}</a>
            </Link>
        </div>
    )
}

export default SocialsItem
