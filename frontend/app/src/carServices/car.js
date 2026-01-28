import axios from "axios";

const API_URL = "http://localhost:8080/user/cars"; // change host/port if needed

export const createCar = async (carData, images) => {
  const formData = new FormData();

  // 1) append JSON part as a Blob
  formData.append(
    "carDto",
    new Blob([JSON.stringify(carData)], { type: "application/json" })
  );

  // 2) append images (multiple)
  if (images && images.length) {
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
  }

  const response = await axios.post(`${API_URL}/addcar`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
