import axios from "./axios";

// create Razorpay order
export const createOrder = async (amount) => {
  const res = await axios.post(
    "/user/payment/create-order",
    null,
    { params: { amount } }
  );
  return res.data;
};

// verify payment
export const verifyPayment = async (data) => {
  const res = await axios.post("/user/payment/verify", data);
  return res.data;
};
