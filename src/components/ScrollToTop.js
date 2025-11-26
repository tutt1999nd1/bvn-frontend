import { useEffect } from 'react'
import {useLocation, useParams} from 'react-router-dom'

const ScrollToTop = () => {
    const { pathname } = useLocation()
    const params = useParams(); // Lấy các tham số từ URL

    useEffect(() => {
        console.log(pathname)
        /* settimeout make sure this run after components have rendered. This will help fixing bug for some views where scroll to top not working perfectly */
        setTimeout(() => {
            document.getElementById("test").scroll(0,0)        }, 0)
    }, [pathname,params])
    return null
}

export default ScrollToTop