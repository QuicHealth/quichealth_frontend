import { api } from "./axios";

export const hospitals = async () => {
  const response = await api.get("/get-hospitals", {
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  });
//   console.log(response, "hisptals");
  if (!response.data.status) throw new Error(response.data.message);
  return response.data;
};
