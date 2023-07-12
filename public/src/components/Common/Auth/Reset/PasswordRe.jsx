import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify

export const PasswordRe = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const setVal = (e) => {
    setEmail(e.target.value);
  };

  const sendLink = async (e) => {
    e.preventDefault();

    if (email === "") {
      toast.error("Email is required!", {
        position: "top-center",
      });
    } else if (!email.includes("@")) {
      toast.warning("Include @ in your email!", {
        position: "top-center",
      });
    } else {
      const res = await fetch("/sendpasswordlink", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.status === 201) {
        setEmail("");
        setMessage(true);
      } else {
        toast.error("Invalid User", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Enter Your Email</h1>
          </div>

          {message ? (
            <p style={{ color: "green", fontWeight: "bold" }}>
              Password reset link sent successfully to your email!
            </p>
          ) : (
            ""
          )}

          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={email}
                onChange={setVal}
                name="email"
                id="email"
                placeholder="Enter Your Email Address"
              />
            </div>

            <button className="btn" onClick={sendLink}>
              Send
            </button>
          </form>

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
  );
};
