

import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import AppDashboard from "./dashboard/page";



export default async function Home(){
  return (
    <AppDashboard/>
  )
}
