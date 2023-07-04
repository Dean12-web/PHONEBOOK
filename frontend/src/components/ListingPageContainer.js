import React, { useRef, useEffect, useState } from "react";
import ListingPageComponent from "./ListingPageComponent"
import axios from 'axios'

export default function ListingPageContainer() {
    const listInnerRef = useRef()
    const [currPage, setCurrPage] = useState(1)
    const [prevPage, setPrevPage] = useState(0)
    const [userList, setUserList] = useState([])
    const [lastList, setLastList] = useState(false)

    useEffect(() => {
        const fetchData = () => {
            console.log("Fetching data for page:", currPage); // Add this log to check the current page value
            axios.get(
                `http://localhost:3001/api/phonebooks?page=${currPage}`
            ).then((response) =>{
                console.log("Response data:", response.data); // Add this log to check the response data
                if (!response.data.success) {
                    setLastList(true)
                    return
                }
                console.log(response.data.data.phonebooks, "Paginate")
                console.log("onPage = ", currPage)
                setPrevPage(currPage);
                setUserList([...userList, ...response.data.data.phonebooks])
            }).catch(()=>{
                setLastList([])
            })

        }
        if (!lastList && prevPage !== currPage) {
            fetchData()
        }
    }, [currPage, lastList, prevPage, userList])

    const onScroll = () => {
        if (listInnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current
            if (scrollTop + clientHeight === scrollHeight) {
                setCurrPage(currPage + 1)
            }
        }
    }

    return (
        <ListingPageComponent
            onScroll={onScroll}
            listInnerRef={listInnerRef}
            userList={userList}
        />
    )
}