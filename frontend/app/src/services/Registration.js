import axios from "axios";

export const registerUser = async (userData) => {
  const responce=await axios.post(`http://localhost:8080/user/register`, userData, 
    {
      headers: {
        "Content-Type": "application/json"
      }
});

   return responce.data;
};