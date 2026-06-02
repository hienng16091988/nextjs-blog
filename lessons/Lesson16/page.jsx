import { prisma } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import Link from "next/link";


export default async function Dashboard() {
  const user = await getAuthUser();

  const userPosts = await prisma.post.findMany({
    where: { authorId: Number(user.userId) },
  });

  if (!userPosts) return <p>Failed to fetch data!</p>

  if (userPosts.length ===0 ) return <p>You don't have any posts.</p>
    
  

  return (
    <div >
      <h1 className="title">Dashboard</h1>
        <table>
          <thead>
            <tr>
              <th className="w-3/6">Title</th>
              <th className="w-1/6">View</th>
              <th className="w-1/6">Edit</th>
              <th className="w-1/6">Delete</th>
            </tr>
          </thead>

          <tbody>
            { userPosts.map((post) => 
                <tr>
                    <td className="w-3/6">{ post.title }</td>
                    <td className="w-1/6 text-green-500"><Link href={`/posts/show/${post.id}`} >View </Link></td>
                    <td className="w-1/6 text-blue-500"><Link href={`/posts/edit/${post.id}`} >Edit</Link> </td>
                    <td className="w-1/6 text-red-500">Delete</td>
                </tr>
            ) }
          </tbody>
        </table>
     
    </div>
  );
}
