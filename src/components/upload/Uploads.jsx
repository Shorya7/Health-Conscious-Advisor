import React, { useState, useEffect } from "react";
// import ScanDoc from "./ScanDoc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./Uploads.css";
import axios from "axios";

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

const Uploads = () => {
  const Navigate = useNavigate();

  const [file1, setFile1] = useState(null);
  const [DOCS, setDOCS] = useState(false);
  const [loading, setLoading] = useState(false);

  const [aadhaar, setAadhaar] = useState("");
  const [dob, setDob] = useState("");
  const [det, setDet] = useState("");


  const handleFileUpload = async () => {
    // const token = localStorage.getItem("token");
    setLoading(true);
    // Check if both files are selected
    if (file1) {
      const formData = new FormData();
      formData.append("file", file1);

      try {
        const response = await fetch(
          "http://127.0.0.1:5000/process-image",
          {
            method: "POST",
            body: formData,
           
          }
        );

        if (response.ok) {
          const responseData = await response.json();

          toast.success("Data extracted successfully", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          // localStorage.setItem("token", responseData.data.token);
          console.log(responseData);
          setDOCS(true);
          localStorage.setItem("docs", true);
          localStorage.setItem("resp",responseData.text)
        } else {
          showToast("Error uploading files");
        }
      } catch (error) {
        // Handle fetch error
        showToast(`${error.messsage}`);
        console.error(error);
      }

      setLoading(false);
    } else {
      showToast("Please select both files before uploading.");
      setLoading(false);
    }
  };
// Your response
let response = localStorage.getItem("resp");
console.log(String(response));
let responseArray = response.split('\n').map(item => item.trim());
let m, n;

console.log(responseArray.length);
for (let i = 0; i < responseArray.length; i++) {
  if (responseArray[i] === 'Healthy:') {
    m = i;
  } else if (responseArray[i] === 'Not Healthy:') {
    n = i;
  }
}

console.log(m, n);
const healthy = [];
const unhealthy = [];
for (let temp = m + 2; temp < n - 1; temp++) {
  // Remove the "-" character at the beginning
  healthy.push(responseArray[temp].substring(2));
}
for (let temp = n + 2; temp < responseArray.length; temp++) {
  // Remove the "-" character at the beginning
  unhealthy.push(responseArray[temp].substring(2));
}
console.log(healthy, unhealthy);
localStorage.setItem("healthyItems", JSON.stringify(healthy));
localStorage.setItem("unhealthyItems", JSON.stringify(unhealthy));

function handleSubmit(){
  var token = localStorage.getItem("token");
      setLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  axios
        .post("https://testhost-fe1o.onrender.com/status", {
        },{ headers })
        .then((result) => {
          token = result.data.token;
          if (result.data.success === true) {
            toast.success(`${result.data.status}`, {
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
          } else {
            showToast(`${result.data.msg}`);
          }
          setLoading(false);
          console.log(result);
        })

        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
}
  const handleFileChange = (e, setFileCallback) => {
    const selectedFile = e.target.files[0];
    setFileCallback(selectedFile);
  };
  // useEffect(() => {
  //   let docs = localStorage.getItem("docs");
  //   if (docs) {
  //     setTimeout(() => {
  //       Navigate("/doct/scan");
  //     }, 3000);
  //   }
  // }, [Navigate]);

  return (
    <div className="fullsc">
      <ToastContainer autoClose={4000} theme="colored" newestOnTop={true} />

      (
        <>
          <div className="govt_cards_body">
            <div className="left_key">
              <div className="left_logo">
                {/* <img src={Card} alt="CARD" style={{ width: "400px" }} /> */}
              </div>
            </div>
            <div className="right_side" id="right_side_col">
              <div className="right_logo_aicte" >
                {/* <img src={AICTE} alt="AICTE"/> */}
              </div>
              <div id="container_ca" className="container">
                <div className="head_log" style={{color : "black"}}>Upload Govt. ID</div>
                <input
                  type="file"
                  accept="image/jpeg"
                  onChange={(e) => handleFileChange(e, setFile1)}
                />
                <label htmlFor="file">Upload Aadhaar</label>
                <div className="sub_btn_log">
                  <button
                    type="submit"
                    disabled={loading}
                    onClick={handleFileUpload}
                  >
                    {loading ? <>Verifying..</> : <>Submit</>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    </div>
  );
};

export default Uploads;