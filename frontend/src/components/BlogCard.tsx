interface BlogCardProps {
    authorName : string,
    title : string,
    content : string,
    publishedDate : string;
}

export const BlogCard = ({
    authorName,
    title,
    content, 
    publishedDate
} :  BlogCardProps) =>{

    return <div className="p-4 border-b border-slate-300 pb-4">
        <div className="flex ">
            <Avatar name={authorName}/> 
            <div className="flex justify-center flex-col font-thin pl-2 text-sm">{authorName}</div>
            <div className="flex justify-center pl-2 flex-col text-xs"> &#9679; </div> 
            <div className="flex justify-center pl-2 font-thin text-slate-500"> {publishedDate} </div>
        </div>
        <div className="pt-2 font-semibold text-2xl">
            {title}
        </div>
        <div className="font-thin text-md">
            {content.slice(0,200) + "..."}
        </div>
        <div className="text-sm font-thin text-slate-500 pt-2">
            {`${Math.ceil(content.length/200)} minute(s) read`}
        </div>
    </div>
}

export function Avatar({name} : {name:string}){
    return <div className="relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="text-sm text-gray-600 dark:text-gray-300">{name[0]}</span>
    </div>
    
}
// export function Avatar({name,size=5} : {name:string, size?:number}){
//     return <div className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
//         <span className="text-sm text-gray-600 dark:text-gray-300">{name[0]}</span>
//     </div>
    
// }