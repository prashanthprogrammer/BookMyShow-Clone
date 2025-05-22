import React, { useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import PropTypes from "prop-types";

const PaymentModal = ({ setIsOpen, isOpen, price }) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  const launchRazorPay = () => {
    const options = {
      key: "rzp_test_trSZbjvDJSItP3",
      amount: price * 100,
      currency: "INR",
      name: "Book My Show Clone",
      description: "Movie purchase or rent",
      handler: () => {
        setIsOpen(false);
        alert("Payment Successful");
      },
      theme: { color: "#c4242d" },
    };

    try {
      const razorPay = new window.Razorpay(options);
      razorPay.open();
    } catch (error) {
      console.error("Failed to initialize Razorpay:", error);
      alert("Payment failed. Please try again.");
    }
  };

  // Ensure Razorpay script is loaded
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Please make a payment
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Hello, please complete the payment using the button below.
                  </p>
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onClick={launchRazorPay}
                    aria-label="Pay now"
                  >
                    Pay ₹{price}
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                    aria-label="Cancel payment"
                  >
                    Cancel Payment
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

PaymentModal.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  price: PropTypes.number.isRequired,
};

export default PaymentModal;