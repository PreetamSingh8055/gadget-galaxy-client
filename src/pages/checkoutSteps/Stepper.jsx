import React from "react";

const Stepper = ({ steps, currentStep, onStepChange }) => {
  return (
    <div className="w-full flex flex-col items-center px-2 sm:px-0">
      <div className="flex items-center justify-center w-full max-w-3xl">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex-1 flex flex-col items-center"
          >
            {/* Circle + Lines */}
            <div className="w-full flex items-center">
              {/* Left Line */}
              {index !== 0 && (
                <div
                  className={`flex-1 h-0.5 sm:h-1 transition-all
                    ${
                      currentStep > index - 1
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }
                  `}
                />
              )}

              {/* Circle */}
              <button
                onClick={() => {
                  if (index !== 2) onStepChange(index);
                }}
                className={`
                  w-9 h-9 sm:w-12 sm:h-12
                  flex items-center justify-center
                  rounded-full font-semibold
                  text-xs sm:text-sm
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
                  className={`flex-1 h-0.5 sm:h-1 transition-all
                    ${
                      currentStep > index
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }
                  `}
                />
              )}
            </div>

            {/* Title */}
            <p
              className={`
                mt-2 sm:mt-3
                text-xs sm:text-sm
                w-full text-center
                ${index === 0 ? "sm:text-left" : ""}
                ${index === steps.length - 1 ? "sm:text-right" : ""}
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
