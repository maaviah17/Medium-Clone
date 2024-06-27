import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlogInput,updateBlogInput } from "@mmkx17/mediumcommon";
  
export const blogRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        JWT_SECRET : string
    },
    Variables : {
        userId : string;
    }
   

}>();

// anytime any request comes on this router it has to go through this middleware this is what means /*
blogRouter.use('/*', async(c,next)=>{
    // will extract the authorID and will pass it down to the route handler (post req)
    
    const authHeader = c.req.header("authorization") || "";

    try{
        const user = await verify(authHeader, c.env.JWT_SECRET); 
    
        if(user){
            // @ts-ignore
            c.set("userId", user.id);
            // console.log(user);
            await next();
            }else{
                c.status(403)
                return c.json({
                msg : "You are not logged in!"
            })
                }
    }catch(error){
        c.status(403)
        return c.json({
        msg : "You are not logged in!"
        })
        
    }

    
  
})

// this endpoint creates a new blog (post)  so first we need to initialize prisma and get the body
blogRouter.post('/' , async(c)=>{

    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({msg : " this is the blog post req inputs are not correct"})
    }
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const blog = await prisma.post.create({
        data : {
            title : body.title,
            content : body.content,
            authorId : Number(authorId),
        }
    })

    return c.json({
        id: blog.id
    })
})

blogRouter.put('/' , async(c)=>{

    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({msg : "this is the blog put inputs are not correct"})
    }  
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());
    
    // blog or posts ..use whatever both are same
    const blog = await prisma.post.update({
        where : {
            id : body.id
        }, data : {
            title : body.title,
            content : body.content
        }
    })

    return c.json({
        id : blog.id
    })
})


// only showing the title on the landing page
// todo : add pagination as we do not want all the blogs to show...10-12 wud be fine
blogRouter.get('/bulk' , async(c)=>{

    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany({
        select : {
            content : true,
            title : true,
            id : true,
            author:{
                select:{
                    name : true
                }
            }
        }
    });
    return c.json({
        blogs
    })
})


// never use body in a get request to get the parameters like id here
blogRouter.get('/:id' , async(c)=>{
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try{ 
        const blog = await prisma.post.findFirst({
            where : {
                id : Number(id)
            },select : {
                title : true,
                content : true,
                author : {
                    select : {
                        name : true
                    }
                }
            }
        })
        return c.json({
        blog
    })
    }catch(error){
        c.status(411);
        return c.json({
            msg : "error while fetching blog post"
        })
    }
})


