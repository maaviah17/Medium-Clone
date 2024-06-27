import { ChangeEvent, useState  } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignupInput } from "@mmkx17/mediumcommon"
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({type}: {type:"signup" | "signin"}) => {
    const navigate = useNavigate();
    const [postInputs,setPostInputs] = useState<SignupInput>({
        username : "",
        name:"",
        password:""
    });

    // async function sendRequest(){
    //     try{
    //         const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs);
    //         const jwt = response.data;
    //         localStorage.setItem("token", jwt);
    //         navigate("/blogs");
    //     }catch(e){
    //         console.error("Error", e);
    //     }
    // }

    const sendRequest = async () => {
        try {
            const data = JSON.stringify(postInputs);
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const jwt = response.data;
            localStorage.setItem('token', jwt);
            navigate('/blogs');
        } catch (e) {
            // alert(error.data.message)
            console.error('Error', e);
        }
    };

      

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div className="px-10  w-3/5">
                <div className="text-center text-3xl font-extrabold">
                Create an account 
                </div>
                <div className="text-slate-400 text-center">
                   {type === "signin" ? "Don't have an account" : "Already have an account"}  <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}> 
                   {type === "signup" ? "Signin" : "Signup" }
                   </Link>
                </div>
            <div className="pt-2">
            {type === "signup" ? <LabelledInput label="Name" placeholder="Enter name here..." onChange={(e)=>{
                setPostInputs(({
                    ...postInputs, //this is like putting all the existing data and then below u override that data with the current value entered by the user
                    name : e.target.value
                }))
            }} /> : null}

            <LabelledInput label="username" placeholder="user@example.com" onChange={(e)=>{
                setPostInputs(({
                    ...postInputs, //this is like putting all the existing data and then below u override that data with the current value entered by the user
                    username : e.target.value
                }))
            }} /> 

            <LabelledInput label="password" type="password" placeholder="Sshhh secret ..." onChange={(e)=>{
                setPostInputs(({
                    ...postInputs, //this is like putting all the existing data and then below u override that data with the current value entered by the user
                    password : e.target.value
                }))
            }} /> 
            <button onClick={sendRequest} type="button" className="w-full mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
             focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700
              dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Signup" : "Signin"}</button>
            <button className="w-full mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
             focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700
              dark:focus:ring-gray-700 dark:border-gray-700"> <Link to={"/blog/2"}> Check Blogs page without signinup🤓</Link></button>
            </div>
            </div> 
            
        </div>
    </div>
}

interface LabelledInputType{
    label : string,
    placeholder : string,
    onChange : (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}
function LabelledInput({label,placeholder, onChange,type}:LabelledInputType){
    return <div>
        <div>
            <label className="block mb-2 text-sm font-semibold pt-4 text-black ">{label}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
        </div>  
    </div>
}

