import React from "react";

const Stepper = ({ steps, currentStep, onStepChange }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex items-center justify-center w-full max-w-3xl">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 flex flex-col items-center ">
            {/* Circle + Horizontal Line Wrapper */}
            <div className="w-full flex items-center ">
              {/* Left Line */}
              {index !== 0 && (
                <div
                  className={`flex-1 h-1 transition-all 
                    ${currentStep > index - 1 ? "bg-green-500" : "bg-gray-300"}
                  `}
                ></div>
              )}

              {/* Circle */}
              <button
                onClick={() => {
                  if (index !== 2) onStepChange(index);
                }}
                className={`
                  w-12 h-12 flex items-center justify-center rounded-full font-semibold text-sm 
                  relative z-10 transition 
                  ${
                    currentStep === index
                      ? "bg-purple-600 text-white scale-110 shadow-lg"
                      : currentStep > index
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-700"
                  }
                  ${index !== 2 ? "cursor-pointer" : ""}
                `}
              >
                {index + 1}
              </button>

              {/* Right Line */}
              {index !== steps.length - 1 && (
                <div
                  className={`flex-1 h-1 transition-all
                    ${currentStep > index ? "bg-green-500" : "bg-gray-300"}
                  `}
                ></div>
              )}
            </div>

            {/* Title Under Circle */}
            <p
              className={`
    mt-3 text-sm w-full
    ${index === 0 ? "text-left" : ""}
    ${index === steps.length - 1 ? "text-right" : ""}
    ${index !== 0 && index !== steps.length - 1 ? "text-center" : ""}
  `}
            >
              {step.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
