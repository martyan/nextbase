import React from 'react'
import Link from 'next/link'
import './Footer.scss'


const Footer = () => {
    return (
        <footer>
            <div className="inner">
                <div className="github">
                    <Link href="https://github.com/martyan/nextbase"><a>Nextbase on<i className="fa fa-github"></i></a></Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer
