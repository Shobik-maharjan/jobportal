import React, { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export const Forgotpassword = () => {
  const { id, token } = useParams();

  const history = useNavigate();

  const [data2, setData] = useState(false);

  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const userValid = async () => {
    const res = await fetch(`/forgotpassword/${id}/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.status == 201) {
      console.log("user valid");
    } else {
      history("*");
    }
  };

  const setval = (e) => {
    setPassword(e.target.value);
  };

  const sendpassword = async (e) => {
    e.preventDefault();

    if (password === "") {
      toast.error("password is required!", {
        position: "top-center",
      });
    } else if (password.length < 6) {
      toast.error("password must be 6 char!", {
        position: "top-center",
      });
    } else {
      const res = await fetch(`/${id}/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.status == 201) {
        setPassword("");
        setMessage(true);
      } else {
        toast.error("! Token Expired generate new Link", {
          position: "top-center",
        });
      }
    }
  };

  useEffect(() => {
    userValid();
    setTimeout(() => {
      setData(true);
    }, 3000);
  }, []);

  return (
    <>
      {data2 ? (
        <>
          <section>
            <div className="form_data">
              <div className="form_heading">
                <h1>Enter Your NEW Password</h1>
              </div>

              <form>
                {message ? (
                  <p style={{ color: "green", fontWeight: "bold" }}>
                    Password Succesfulyy Update{" "}
                  </p>
                ) : (
                  ""
                )}
                <div className="form_input">
                  <label htmlFor="password">New password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={setval}
                    name="password"
                    id="password"
                    placeholder="Enter Your new password"
                  />
                </div>

                <button className="btn" onClick={sendpassword}>
                  Send
                </button>
              </form>
              <p>
                <NavLink to="/">Home</NavLink>
              </p>
              <ToastContainer />
            </div>
          </section>
          <style>{`
        .form_data {
          /* Your styles for the form container */
          max-width: 550px;
    margin: 25px auto;
    padding: 35px 10px;
    box-shadow: 0 0 15px -10px #2d3748;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
        }
        
        .form_heading {
          /* Your styles for the form heading */
          display: flex;
    flex-direction: column;
    align-items: center;
        }
        
        .form_input {
          /* Your styles for the form input container */
          width: 100%;
          padding: 11px;
          border: 1px solid #d4d0d0;
          border-radius: 5px;
          outline: none;
          margin-bottom: 14px;
          margin-top: 9px;
          font-size: 14px;
        }
        
        label {
          /* Your styles for the form label */
        }
        
        input {
          /* Your styles for the form input */
        }
        
        .btn {
          /* Your styles for the button */
            display:block;
            width: 100%;
            padding: 15px;
            border: none;
            outline: none;
            border-radius: 5px;
            background-color:#1a365d;
            color: #fff;
            font-weight: 600;
            font-size: 18px;
            margin-top: 10px;
            cursor: pointer;
            transition: all .3s;
        }
        
        
        form .btn:hover{
            background-color: #97a1b1;
        }
        
        
        
        p {
          /* Your styles for the success message */
        }
      `}</style>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      )}
    </>
  );
};
