import PostCard from "@/components/PostCard";
import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function Home() {
  const posts = await prisma.post.findMany();

  console.log(posts);

  if (posts) {
    return (
      <div className="grid grid-cols-2 gap-6">
        {
          posts.map((post) => (
            <div key={post.id} >
               <PostCard post={post} />
            </div>
          ))
        }
        
      </div>
    );
  } else {
    return <p>Failed to fetch the data from database</p>
  }
}
