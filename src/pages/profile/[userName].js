import AuthPageHeader from "@/src/components/Headers/AuthPageHeader";
import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { getUser } from "@/src/services/users";
import { getBlogs } from "@/src/services/blogsHandle";
import {
  Button,
  Form,
  Image,
  Input,
} from 'antd';

export default function(props){
  
  const {data:session} = useSession();
  const {userData} = props;
  const [form] = Form.useForm();
  if(!session){
    return<div>Loading</div>
  }
  const emailFind = userData.find((p)=>p.email === session.user.email)
  const userName = emailFind.fullName

  
  const onFinish = async (values) => {
    try{ 
        const response = await fetch("/api/auth/signup",{
            method:"PATCH",
            body:JSON.stringify({values,emailFind}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(response.ok){
            alert("Password Changed");
        }
        else{throw new Error("Old Password not Matched")}
    }catch(err){
        alert(err);
    }
  };

    return(
        <div>
          <div>
            <AuthPageHeader props={userName}/>
          </div>
      <div style={{display:"flex",minWidth:"100%",justifyContent:"center"}}>
        
          <div className='parentDivSignup'>
                <Form
                form={form}
                name="register"
                onFinish={onFinish}
                style={{
                    width:200,
                    display:"flex",
                    flexDirection:"column",
                    justifyContent:"center",
                }}
                scrollToFirstError
                >
                    <h2>{userName}</h2>
                <Form.Item
                    name="oldPassword"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password atleast 8 characters!',
                        min: 8
                    },
                    ]}
                    hasFeedback>
                    <Input.Password  placeholder='Old Password' className='inputForm' />
                </Form.Item>
            
                <Form.Item
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password atleast 8 characters!',
                        min: 8
                    },
                    ]}
                    hasFeedback
                >
                    <Input.Password  placeholder='New Password' className='inputForm' />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                    {
                        required: true,
                        message: 'The new password that you entered do not match!',
                        min: 8
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error());
                        },
                    }),
                    ]}
                >
                    <Input.Password placeholder='Repeat Password' className='inputForm'/>
                </Form.Item>
                <div style={{display:'flex',justifyContent:'center'}}>
                    <Form.Item >
                    <Button type="primary" htmlType="submit" style={{width:"100px",
                    backgroundColor:"rgba(119, 73, 248, 1)",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    }}>
                    Update
                    </Button>
                </Form.Item>
                </div>
                </Form>
                </div>
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
  const blogs = getBlogs();
  return{
    props:{
      userData:data,
      user:session,
      blogs:blogs
    }
  }
}