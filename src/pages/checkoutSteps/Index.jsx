import React, { useState } from "react";
import Stepper from "./Stepper";
import AddAddress from "./AddAddress";
import ReviewAndPlaceOrder from "./ReviewAndPlaceOrder";
import ThankyouPage from "./ThankyouPage";

const steps = [
  {
    title: "Address",
    description: "Add Your Address",
    component: (props) => <AddAddress {...props} />,
  },
  {
    title: "place order",
    description: "Place Your Order",
    component: (props) => <ReviewAndPlaceOrder {...props} />,
  },
  {
    title: "success",
    description: "Order Successful",
    component: (props) => <ThankyouPage {...props} />,
  },
];

const CheckoutSteps = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className={` ${currentStep !== 2 ? "container mx-auto py-10" : ""}  `}>
      {currentStep !== 2 && (
        <Stepper
          steps={steps}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
        />
      )}

      {currentStep !== 2 && (
        <div className="mt-8 p-4">
          <h2 className="text-lg font-semibold mb-2 text-center">
            {steps[currentStep].description}
          </h2>
        </div>
      )}

      {/* Pass props to component */}
      {steps[currentStep].component({
        currentStep,
        setCurrentStep,
      })}
    </div>
  );
};

export default CheckoutSteps;
