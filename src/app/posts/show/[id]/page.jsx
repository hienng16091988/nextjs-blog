import PostCard from "@/components/PostCard";
import { prisma } from "@/lib/db";

export default  async function Show( { params} ){
    const {id}= await params;
    
    const post = await prisma.post.findFirst( { where: {id: Number(id)} });

    return (
        <div className="container w-1/2">
            {
                post ?
                <PostCard post={post} />: <p>Failed to fetch the data</p>
            }
        </div>
    );
}