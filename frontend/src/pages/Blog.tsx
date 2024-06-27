import { Blogs } from "./Blogs"
export const Blog = () =>{
    return <div>
        {/* Blog page */}
        <Blogs />
    </div>
}

export function Avatar({name,size=6} : {name:string, size?:number}){
    return <div className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
        <span className="text-sm text-gray-600 dark:text-gray-300">{name[0]}</span>
    </div>
}