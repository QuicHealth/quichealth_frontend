import { api } from "./axios";

export const hospitals = (axiosPrivateApi) => {
  return async () => {
    const response = await axiosPrivateApi.get("/get-hospitals", {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });

    if (!response.data.status) throw new Error(response.data.message);
    return response.data;
  };
};
