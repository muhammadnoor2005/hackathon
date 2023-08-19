
import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import { getUser } from "@/src/services/users";
import { getBlogs } from "@/src/services/blogsHandle";
import AuthPageHeader from "@/src/components/Headers/AuthPageHeader";
import DashboardTextArea from "@/src/components/DashboardTextArea/DashboardTextArea";
import Blogs from "@/src/components/Blogs/Blogs";
export default function Home(props){
  const {data:session} = useSession();
  const {userData} = props;

  if(!session){
    return<div>Loading</div>
  }
  const emailFind = userData.find((p)=>p.email === session.user.email)
  const userName = emailFind.fullName

  const {blogs} = props;

    return(
      <div>
        <div>
          <AuthPageHeader props={userName}/>
        </div>
        <div>
          <DashboardTextArea props={userName}/>
        </div>
        <div>
          <Blogs blog={blogs}/>
        </div>
      </div>
    )
}
export async function getServerSideProps({req}){
    const session = await getSession({req});
    if (!session){
      return{
        redirect:{
          destination:"/auth/login/",
          permanent:false,
        }
      }
    }
    const data = getUser();
    const blogs = getBlogs()
    return{
      props:{
        userData:data,
        user:session,
        blogs:blogs
      }
    }
}