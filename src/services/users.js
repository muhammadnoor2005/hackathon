
import { compare, hash } from "bcrypt";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(),"src","data","userAuth.json");

export function getUser(){
    const data = fs.readFileSync(filePath);
    return(JSON.parse(data));
}
export function getByEmail(email){
    const data = getUser();
    return(data.find(user=>user.email.toLowerCase() === email.toLowerCase()));
}
export async function saveUser({firstName,lastName,email,password}){
    const found = getByEmail(email);
    if(found){
        throw new Error("User already exixts")
    }
    const data = getUser();
    const hashedPass = await hash(password,12);
    data.push({
        id:data.length +1,
        firstName,lastName,email, 
        fullName:`${firstName} ${lastName}`,
        password:hashedPass,
    })
    fs.writeFileSync(filePath,JSON.stringify(data));
}
export async function verifyPass(password,hashedPass){
    const isValid = await compare (password,hashedPass);
    return isValid;
}
export async function updatedPass(values,emailFind){
    const data = getUser();
    console.log(values.oldPassword)
    const userFind = data.find(user=>user.email === emailFind.email);
    if(!userFind){
        throw new Error("User not found");
    }
    const isValid = await verifyPass(values.oldPassword,userFind.password);
    if(!isValid){
        throw new Error("Old Password not Matched");
    }
    const newHashedPass = await hash(values.password,12);
    userFind.password = newHashedPass;
    fs.writeFileSync(filePath,JSON.stringify(data));
}
