import { useState } from "react";
import { useAuth } from "../../contexts/authContext";
import {  Link , useNavigate } from "react-router-dom"
import { signinService } from "../../services/signinService";
import "./auth.css";

const Signin = () => {
 
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { setAuth } = useAuth();
  const navigate = useNavigate()

  const signinSubmitHandler = async (user) => {
    const { encodedToken } = await signinService(user);
    if (encodedToken !== undefined) {
      localStorage.setItem("AUTH_TOKEN", JSON.stringify(encodedToken));
      setAuth(auth => ({
        ...auth,
        status: true,
        token: encodedToken,
      }));
    //   navigate("/")
    }
  };

  const logout = () =>{
    window.location.reload(true)
    localStorage.removeItem("AUTH_TOKEN")
  }
  return (
    <section >
      <div className = "logout-btn-container">
         <button className = "logout-btn" onClick = {() => logout()}> Logout</button>
      </div>

      <form className="page-wrapper flex-page" onSubmit={e => {
          e.preventDefault();
          signinSubmitHandler(user);
        }}>
        <h1 className="page-heading centered">Login</h1>
  
        <div className="input-labels">Email Address</div>
        <input className="input-field" type="email" placeholder="example@gmail.com" value={user.email }
            onChange={e => setUser({ ...user, email: e.target.value })} required />
  
        <div className="input-labels">Password</div>
        <input className="input-field" type="password" placeholder="***********"  value={user.password}
              onChange={e => setUser({ ...user, password: e.target.value })} required/>
  
        <div className="password-info flex-page">
          <input className="checkbox" type="checkbox" />
          <p className="checkbox-label">Remember me</p>
          <a className="forgot-password" href="#">Forgot password?</a>
        </div>
  
        <button className="login-button" type = "submit">Signin</button>
        <button className="signin-guest-btn login-button"
            type="button"
            onClick={() =>
              signinSubmitHandler({
                email: "adarshbalika@gmail.com",
                password: "adarshBalika123",
              })
            }
          >
            Signin as Guest
          </button>
  
       <Link to = "/signup" className="create-account-link">Create new account ></Link>
    </form>
    </section>
  );
};
export { Signin };