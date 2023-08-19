import React from 'react';
import { Input,Button } from 'antd';
const { TextArea } = Input;


export default function({props}){
    const fullName = props
    const date = new Date()
    const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const year = date.getFullYear()
    const day = date.getDate()
    const month = monthsArray[date.getMonth()];

    const completeDate = `${month} ${day}, ${year}`

    let title;
    let desc;

    const getTitle = (e)=>{
        title = e.target.value;
    }
    const getDesc = (e)=>{
        desc = e.target.value;
    }
    const publishBlog = async()=>{
        try{
            const response  = await fetch("/api/blogs",{
                method:"POST",
                body:JSON.stringify({title,desc,completeDate,fullName}),
                headers:{
                    "Content-Type":"application/json"
                }
        })
            if(response.ok){
                alert("Published");
            }
        }catch(err){
            console.log(err)
        }
    }
    return(
        <div className='dashboardTextareaParent'>
            <div >
                <Input placeholder="Title" onBlur={getTitle} onChange={getTitle} onFocus={getTitle} style={{marginBottom:"1%"}} />
            </div>

            <div>
                <TextArea
                showCount
                minLength={100}
                maxLength={3000}
                style={{
                    height: 120,
                    resize: 'none',
                }}
                onChange={getDesc}
                onFocus={getDesc}
                onBlur={getDesc}
                placeholder="What is in your mind?"
                />
            </div>
            <div>
                <Button type="primary" style={{
                    marginTop:"1%",
                    width:"100px",
                    backgroundColor:"rgba(119, 73, 248, 1)",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center"
                }} onClick={()=>{publishBlog(),getTitle,getDesc}}>Publish Blog</Button>
            </div>
        </div>
);
        
}
