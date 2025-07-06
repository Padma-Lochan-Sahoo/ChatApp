import React, { useRef } from "react";

const OTPInput = ({ otp, setOtp }) => {
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp.join(""));

    if (index < 5 && value) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp.join(""));
      if (index > 0) inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "");
    if (pasteData.length === 6) {
      setOtp(pasteData);
      pasteData.split("").forEach((digit, idx) => {
        if (inputsRef.current[idx]) {
          inputsRef.current[idx].value = digit;
        }
      });
      inputsRef.current[5]?.focus(); // Move to last input
    }
  };

  return (
    <div className="flex gap-3 justify-center">
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          type="text"
          maxLength={1}
          ref={(el) => (inputsRef.current[i] = el)}
          className="w-12 h-14 text-center text-xl font-semibold rounded-lg border-2 border-base-300 bg-base-100 text-base-content focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 transition-all duration-150"
          value={otp[i] || ""}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          autoFocus={i === 0}
          pattern="[0-9]*"
          inputMode="numeric"
        />
      ))}
    </div>
  );
};

export default OTPInput;
