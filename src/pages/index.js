
export default function Home() {
  return(
    <div>
      hello
    </div>
  )
}
export async function getServerSideProps(){
  return{
    redirect:{
      destination:"/auth/signup",
      permanent:true,
    }
  }
}
