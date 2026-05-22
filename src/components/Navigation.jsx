import getAuthUser from "@/lib/getAuthUser";
import NavLink from "./NavLink";
import { logout } from "@/actions/auth";

export default async function Navigation() {

  const authUser = await getAuthUser();
  //console.log(authUser);
  
  return (
    <nav>
      <NavLink label="Home" href="/" />

      <div>

        {
          authUser ? (
          <div className="flex items-center" >
            <NavLink label="Dashboard" href="/dashboard" />
            <form action={ logout }>
              <button className="nav-link">Logout</button>
            </form>
          </div>
          ):

          (
            <div>
              <NavLink label="Register" href="/register" />
            <NavLink label="Login" href="/login" /> 
            </div>
          )
        }

        
        
      </div>
    </nav>
  );
}
