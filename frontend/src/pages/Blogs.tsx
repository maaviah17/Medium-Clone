import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { blogContent, cricketContent, yashContent } from "../config"
import { useBlogs } from "../hooks"

export const Blogs = ()=>{
    const {loading,blogs} = useBlogs();
    if(loading){
        return <div>
            loading...
        </div>
    }
    return <div>
        <Appbar />
        <div className="flex justify-center">
        <div className=" max-w-xl">
        {/* <BlogCard
            authorName={"Muawiyah Khalid"}
            title={"How to master the art of losing HER"}
            content={blogContent}
            publishedDate={"16th March,2026"}/>

            <BlogCard
            authorName={"Yashaswee Narayan"}
            title={"A  Self-made Billionaire at the age of 26 only"}
            content={yashContent}
            publishedDate={"16th March,2029"}/>

            <BlogCard
            authorName={"Dale Steyn"}
            title={"Can India finally lift the WorldCup this Sunday ?"}
            content={cricketContent}
            publishedDate={"11th July,2024"}/> */}

            {blogs.map(blog=> <BlogCard 
            authorName={blog.author.name}
            title={blog.title}
            content={blog.content}
            publishedDate={"2nd March,2018"}
            />)}

        </div>

        </div>
    </div>
}