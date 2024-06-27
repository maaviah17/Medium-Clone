import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode,jwt,sign,verify } from 'hono/jwt'
import { signinInput, signupInput } from "@mmkx17/mediumcommon";


export const userRouter = new Hono<{
        Bindings : {
            DATABASE_URL : string,
            JWT_SECRET : string
        }
    }>();


userRouter.post('/signup', async (c) => {
  
    const body = await c.req.json();
    console.log(body);
    // const { success } = signupInput.safeParse(body);
    const result = signupInput.safeParse(body);
   
    // if(!result.success){
    //   c.status(400);
    //   return c.json({result})
    //   return c.json({msg : "Try Again ! inputs are not correct"})
    // }  

    const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    try{
      const user = await prisma.user.create({
        data : {
          email : body.email,
          name : body.name,
          password : body.password
        },
      })
      const token = await sign({id:user.id}, c.env.JWT_SECRET);
      return c.json({
        jwt : token
      })
    } catch(error){
      c.status(411);
      return c.text('Invalid')
    }
  
  
})
  
userRouter.post('/signin', async(c) => {
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    // if(!success){
    //   c.status(411);
    //   return c.json({msg : "this is signin inputs are not correct"})
    // }  
    const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const user = await prisma.user.findUnique({
      where : {
        email:body.email,
        name:body.name,
        password:body.password
      }
    })
  
    if(!user){
      c.status(403);
      return c.json({
        error : "user not found"
      })
    }
  
    const jwt = await sign({id:user.id}, c.env.JWT_SECRET);
    return c.json({jwt})
  
  })