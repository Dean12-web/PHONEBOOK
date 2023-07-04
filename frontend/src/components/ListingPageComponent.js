import React from "react"

export default function ListingPageComponent({onScroll, listInnerRef, userList}){
    return(
        <div>
            <div className="mb-3"
                onScroll={onScroll}
                ref={listInnerRef}
                style={{ height:"100vh", overflowY: "auto" }}>
                {userList.map((item, index)=>{
                    return(
                        <div 
                            key={index}
                            style={{ 
                                marginTop:"40px",
                                display:"flex",
                                justifyContent:"center",
                                alignItems: "center",
                                flexDirection:"column"}}>
                            <p>Name : {item.name}</p>
                            <p>phone : {item.phone}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}