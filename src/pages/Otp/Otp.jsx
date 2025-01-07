import React, { useEffect, useRef, useState } from "react";
import { instance } from "../../components/Axios/AxiosInstance";
import { useParams } from "react-router-dom";

const Otp = () => {
  const params = useParams();
  const [inputerr, setinputerr] = useState(false);
  const [otp, setotp] = useState(new Array(4).fill(""));
  const [finalOtp, setFinalOtp] = useState("");
  const inputRef = useRef([]);
  useEffect(() => {
    if (inputRef.current[0]) {
      inputRef.current[0].focus();
    }
  }, []);
  /**
   * todo : HandleInputChange machanisim
   */

  const HandleInputChange = (e, index) => {
    let value = e.target.value;
    if (isNaN(value)) {
      return setinputerr(true);
    }

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setotp(newOtp);

    // now the otp is apart form each other , now join the all given otp
    let combineOtp = newOtp.join("");

    setFinalOtp(combineOtp);
    // check input field and move cursor or focus  next input field
    if (value && index < otp.length - 1 && inputRef.current[index + 1]) {
      inputRef.current[index + 1].focus();
      setinputerr(false);
    }
  };

  const HandlekeyDown = (e, index) => {
    if (e.key === "ArrowRight" && index < otp.length - 1) {
      if (!value) {
        return;
      }
      setinputerr(false);
      inputRef.current[index + 1].focus();
    }
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      setinputerr(false);
      inputRef.current[index - 1].focus();
    }
  };

  // handleVerifyOtp funtion implement
  const handleVerifyOtp = async () => {
    try {
      const { email } = params;

      const response = await instance.post("/opt-verification", {
        Email_Adress: email,
        OTP: finalOtp,
      });
      console.log(response);
    } catch (error) {
      console.error("from opt verification error", error);
    }
  };

  return (
    <div>
      <div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div class="flex flex-col items-center justify-center text-center space-y-2">
              <div class="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              <div class="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email ba**@dipainhouse.com</p>
              </div>
            </div>

            <div>
              <form
                action=""
                method="post"
                onSubmit={(e) => e.preventDefault()}
              >
                <div class="flex flex-col space-y-16">
                  <div class="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    {otp.map((item, index) => (
                      <div class="w-16 h-16  ">
                        <input
                          class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          id=""
                          key={index}
                          name={`input`}
                          maxLength={1}
                          ref={(input) => (inputRef.current[index] = input)}
                          onChange={(e) => HandleInputChange(e, index)}
                          onKeyDown={(e) => HandlekeyDown(e, index)}
                          onClick={(e) => HandleInput(e, index)}
                        />
                      </div>
                    ))}
                  </div>

                  <div class="flex flex-col space-y-5">
                    <div>
                      <button
                        class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                        onClick={handleVerifyOtp}
                      >
                        Verify Otp
                      </button>
                    </div>

                    <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn't recieve code?</p>{" "}
                      <a
                        class="flex flex-row items-center text-blue-600"
                        href="http://"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Resend
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
