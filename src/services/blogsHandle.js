import fs from "fs";
import path from "path";

const blogsPath = path.join(process.cwd(),"src","data","blogs.json");

export function getBlogs(){
    const blogs = fs.readFileSync(blogsPath);
    return (JSON.parse(blogs));
} 
export function writeBlog({title,desc,completeDate,fullName}){
    const data = getBlogs();
    data.push({
        title,desc,completeDate,fullName,
        id:data.length + 1
    })
    fs.writeFileSync(blogsPath,JSON.stringify(data))
}
export function deleteBlog(id){
    const data = getBlogs();
    const blogDel = data.find((blog)=>blog.id === id);
    const index = data.indexOf(blogDel);
    data.splice(index,1)
    fs.writeFileSync(blogsPath,JSON.stringify(data))
}