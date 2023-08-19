import { writeBlog ,deleteBlog} from "@/src/services/blogsHandle";
export default async function handler(req,res){
    if(req.method === "POST"){
        const blogsData = req.body
        console.log(blogsData)
        try{
            await writeBlog(blogsData);
            res.status(201).send();
        }catch(err){
            res.status(400).json({message:err});
        }
    }
    if (req.method === "PATCH"){
        const blogId = req.body;
        try{
            await deleteBlog(blogId)
            res.status(201).send()
        }catch(err){
            res.status(400).json({message:err})
        }
        
    }
    return res.status(404).send();
}