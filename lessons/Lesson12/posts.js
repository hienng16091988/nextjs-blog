"use server"

import { prisma } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { BlogFormSchema } from "@/lib/rules";
import { errors } from "jose";
import { redirect } from 'next/navigation';

export async function createPost(state, formData) {

    const user = await getAuthUser();
    
    
    if (!user) return redirect("/");

    const title = formData.get("title");
    const content = formData.get("content");

    const validateFields = BlogFormSchema.safeParse({
        title, content
    });

    if (!validateFields.success){
        return {
            errors: validateFields.error.flatten().fieldErrors,
            title: title,
        }
    }

    try {

        const post = {
            title: validateFields.data.title,
            content: validateFields.data.content,
            authorId: Number(user.userId)
        }
      
        await prisma.post.create({data: post});

    } catch (error) {

        return {
            errors: { title: error.message },
        }
        
    }

    redirect("/dashboard");
}