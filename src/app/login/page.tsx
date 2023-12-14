"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";


export default function LoginPage(){
    const router = useRouter(); 
    const [user,setUser]=React.useState({
        email:"",
        password:"",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user])

    const onLogin=async()=>{
        try {
            setLoading(true);
            const response = await axios.post("api/users/login",user)
            console.log("Login success",response.data);
            router.push("/profile")
        } catch (error:any) {
            console.log("Login failed",error)
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
           <h1>{loading?"Processing":"Login"}</h1>
           <hr/>
           <label htmlFor="email">email</label>
           <input type="text" className="text-black p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-600" id="email" value={user.email} onChange={(e)=>setUser({...user, email:e.target.value})} placeholder="email" />
           <label htmlFor="password">password</label>
           <input type="password" className="text-black p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-600" id="password" value={user.password} onChange={(e)=>setUser({...user, password:e.target.value})} placeholder="password" />
           <button onClick={onLogin} className="mt-4 px-7 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-600">Login</button>
           <Link href="/signup">Visit signup page</Link>
        </div>
    )
}  