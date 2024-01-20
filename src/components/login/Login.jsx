import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Signup.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function Login() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [errpass, seterrPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [erremail, seterremail] = useState(false);
  const emailpattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   const passpattern= /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const showToast = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  var emailresp;
  let token;
  const handleSubmit = (event) => {
    event.preventDefault();
    if (email.match(emailpattern)) seterremail(false);
    // if (password.match(passpattern)) seterrPass(false);
    if (email.length === 0 || password.length === 0) {
      showToast("Please Fill all the Entries");
    } else if (!email.match(emailpattern)) {
      seterremail(true);
      showToast("Please Enter a Valid Email");
    } else {
      setLoading(true);
      axios
        .post(" https://bennett.onrender.com/api/login", {
          // email: email,
          username:"kushwahapraveen0507@gmail.com",
          password: "Praveen@1234",
          rememberMe:"true"
        })
        .then((result) => {
          emailresp = result.status;
          token = result.data.token;
          if (emailresp === 200 && result.data.success === true) {
            toast.success(`${result.data.msg}`, {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            // console.log(token)
            localStorage.setItem("token", token);
            localStorage.setItem("login", true);
          } else {
            showToast(`${result.data.msg}`);
          }
          setLoading(false);
          console.log(result);
        })

        .catch((err) => {
          console.log(err);
          if (err.response && err.response.data && err.response.data.data) {
            showToast(`${err.response.data.data[0].msg}`);
          } else {
            showToast(`Try Again`);
          }
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    let login = localStorage.getItem("login");
    if (login) {
      setTimeout(() => {
        Navigate("/");
      }, 3000);
    
    }
  });

  return (
    <div className="fullsc">
      <ToastContainer autoClose={4000} theme="colored" newestOnTop={true} />
      <div className="mainbody">
        <div className="left_side">
          <div className="left_logo">
            {/* <img src={AICTE} alt="AICTE"/> */}
          </div>
          <div className="left_cont">
          <span id="welcome">Welcome </span> to the AICTE SAHAYAK portal
          </div>
        </div>
        <div className="right_side">
          <div className="container">
            <div className="head_log">Login</div>
            
            <Box
              component="form"
              sx={{
                "& > :not(style)": {
                  m: 2,
                  width: "40ch",
                  "@media (max-width: 410px)": {
                    width: "30ch",
                  },
                  "@media (max-width: 338px)": {
                    width: "28ch",
                  },
                  "@media (max-width: 320px)": {
                    width: "26ch",
                  },
                  "@media (max-width: 300px)": {
                    width: "23ch",
                  },
                },
              }}
              noValidate
              autoComplete="off"
              className="input"
            >
              <TextField
                required
                // id="standard-required"
                label="Email"
                variant="outlined"
                type="email"
                error={erremail}
                helperText={erremail ? "Enter Correct Email" : ""}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value.toLowerCase());

                  const emailpattern =
                    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                  seterremail(!emailpattern.test(e.target.value));
                }}
                InputProps={{
                  style: { color: "white" },
                  classes: {
                    notchedOutline: erremail ? "red-border" : "white-border",
                  },
                }}
                InputLabelProps={{ style: { color: "white" } }}
              />
            </Box>
            <Box
              component="form"
              sx={{
                "& > :not(style)": {
                  m: 2,
                  width: "40ch",
                  "@media (max-width: 410px)": {
                    width: "30ch",
                  },
                  "@media (max-width: 338px)": {
                    width: "28ch",
                  },
                  "@media (max-width: 320px)": {
                    width: "26ch",
                  },
                  "@media (max-width: 300px)": {
                    width: "23ch",
                  },
                },
              }}
              noValidate
              autoComplete="off"
              className="input"
            >
              <TextField
                required
                // id="standard-required"
                label="Password"
                variant="outlined"
                type="password"
                //   error={errpass}
                //   helperText={errpass ? "Your password is weak" : ""}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);

                  // const passpattern =
                  // /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
                  // seterrPass(!passpattern.test(e.target.value));
                }}
                InputProps={{
                  style: { color: "white" },
                  classes: { notchedOutline: "white-border" },
                }}
                InputLabelProps={{ style: { color: "white" } }}
              />
            </Box>
            <div className="forgot_text">
              <Link to="/forgotpassword" id="fglink">
                Forgot Password?
              </Link>
            </div>
            <div className="sub_btn_log">
              <button type="submit" disabled={loading} onClick={handleSubmit}>
                {loading ? <>Verifying..</> : <>Login</>}
              </button>
            </div>
            <div className="bott_text">
              <p>Don't have account?</p>
              <Link to="/signup" id="bottnav">
                New Institute
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
