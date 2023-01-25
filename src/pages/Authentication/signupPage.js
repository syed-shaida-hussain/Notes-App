import { useState } from "react";
import { useAuth } from "../../contexts/authContext";
import {useNavigate , Link} from "react-router-dom"
import { signupService } from "../../services/signupService";
import "./auth.css";
import { Header } from "../../components";

const Signup = () => {
 
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstName: "" , 
    lastName : ""
  });
  const { setAuth } = useAuth();
  const navigate = useNavigate()

  const signupSubmitHandler = async (user) => {
    const {firstName, lastName , encodedToken} = await signupService(user);
    if (encodedToken !== undefined) {
      localStorage.setItem("AUTH_TOKEN", JSON.stringify(encodedToken));
      localStorage.setItem("USERNAME", JSON.stringify(user.firstName));
      setAuth(auth => ({
        ...auth,
        status: true,
        token: encodedToken,
        firstName: firstName,
        lastName : lastName
      }));
      navigate("/")
    }
  };

  return (
    <section >
      <Header/>
      <hr/>
      <form className="page-wrapper login-form flex-page"   onSubmit={e => {
          e.preventDefault();
          signupSubmitHandler(user);
        }}>
        <h1 className="page-heading centered">Signup</h1>


        <div className="input-labels">First name</div>
        <input className="input-field"  value={user.firstName}
            onChange={e => setUser({ ...user, firstName : e.target.value })} required />

        <div className="input-labels">Last name</div>
        <input className="input-field"  value={user.lastName}
            onChange={e => setUser({ ...user, lastName : e.target.value })} required />
            
        
        <div className="input-labels">Email Address</div>
        <input className="input-field" type="email" placeholder="example@gmail.com" value={user.email}
            onChange={e => setUser({ ...user, email: e.target.value })} required />
  
        <div className="input-labels">Password</div>
        <input className="input-field" type="password" placeholder="***********"  value={user.password}
              onChange={e => setUser({ ...user, password: e.target.value })} required />
  
        <button className="login-button" type = "submit">Signup</button>
        <Link to = "/login" className="create-account-link">Already a user?  </Link>

    </form>
    </section>
  );
};
export { Signup };