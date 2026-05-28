
import { updatePost } from "@/actions/posts";
import BlogForm from "@/components/BlogForm";
import { prisma } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { redirect } from "next/navigation";

export  default async function Edit( {params} ){
    const {id} = await params;

    const user = await getAuthUser();
    let post = await prisma.post.findFirst( {where: { id: Number(id) }});

    //post = JSON.parse(JSON.stringify(post));
    //console.log(post);
    if (user.userId !== post.authorId.toString()) return redirect("/");
    
    return (
        <div className="container w-1/2">
            <h1 className="title">Edit your post</h1>

           { post ? 
           (<BlogForm handler={ updatePost } post={post}/>) 
           :
           (<p>Failed to fetch data</p>)
           }

        </div>
    )
}