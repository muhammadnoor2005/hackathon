import { Image } from "antd"

import {Button} from "antd";
import { useState } from "react";

export default function(blogs){
    const delBlog = async (id)=>{
        try{ 
            const response = await fetch("/api/blogs",{
                method:"PATCH",
                body:JSON.stringify(id),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            if(response.ok){
                alert("Deleted");
            }
        }catch(err){
            alert(err);
        }
    }
    let bool = false;

    const {blog} = blogs
    const blogList = blog.map((b)=>{
        return(
            <div className="blogMap" key={b.id}>
                <div className="blogHeading">
                    <Image src="/public/images/img.jpg" className="blogImg"/>
                    <div style={{marginLeft:"4%"}}>
                        <span style={{
                            fontSize:"20px",
                            fontWeight:"500",
                        }}>{b.title}</span><br/>

                        <span style={{
                            fontSize:"11px",
                            color:"GrayText"
                        }}>{`${b.fullName} - ${b.completeDate}`}</span><br/>
                    </div>
                </div>
                <br/>
                <div style={{color:"gray",fontSize:"14px"}}>
                    {b.desc}
                </div>
                <br/>
                <div style={{
                    marginLeft:"5%",
                    color:"rgba(119, 73, 248, 1)",
                    fontSize:"11px",
                    cursor:"pointer"
                }}>
                    <span onClick={()=>{delBlog(b.id)}}>Delete</span>
                    <span style={{marginLeft:"1%"}}>Edit</span>
                </div>
            </div>
        )
    })
    return(
        <div className="mainBlogDiv">
            <span style={{
                fontWeight:500,
                fontSize:"25px"
            }}>My Blogs</span>
            <div className={bool?"showDiv":"hideDiv"}>
                <div className="confirmDelDiv">
                    <span>Are your sure you want to delete this blog?</span>
                    <br/>
                    <div style={{display:"flex",justifyContent:"flexend",minWidth:"40%"}}>
                        <Button type="primary" style={{width:80,backgroundColor:"white",color:"black"}}>Cancel</Button>
                        <Button type="primary"  style={{width:80,backgroundColor:"rgba(119, 73, 248, 1)"}}>Delete</Button>
                    </div>
                </div>
            </div>

            <div>
                {blogList}
            </div>
        </div>
    )
}