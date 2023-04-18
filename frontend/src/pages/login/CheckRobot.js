import React from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

export default function CheckRobot() {
  const navigate = useNavigate();

  const handleCaptchaChange = (response) => {
    console.log("Captcha response:", response);
    navigate("/login");
    // Send the captcha response to your server for verification
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <ReCAPTCHA
          sitekey="6LdY1JclAAAAAKW1Y79Nilm-hcOV44EIoRW4h2RL"
          onChange={handleCaptchaChange}
        />
      </div>
    </div>
  );
}
