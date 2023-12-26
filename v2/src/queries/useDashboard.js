import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { dashboard } from "../api/Patient";
import {
  addEMR,
  expertDashboard,
  getEMR,
  setAvailability,
} from "../api/Expert";
import { toast } from "react-toastify";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const useDashboard = () => {
  const axiosPrivates = useAxiosPrivate();
  const dashboardCall = dashboard(axiosPrivates);
  return useQuery(["dashboard"], dashboardCall);
};

export const useExpertDashboard = () => {
  const axiosPrivates = useAxiosPrivate();
  return useQuery(["expert-dashboard"], expertDashboard(axiosPrivates));
};

export const useSetAvailability = () => {
  const queryClient = useQueryClient();
  const {
    mutate: setAvailables,
    isLoading,
    isSuccess,
  } = useMutation(setAvailability, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["expert-dashboard"]);
      toast.success(data?.message);
    },
    onError: (error) => toast.error(error.response.data.message),
  });

  return { setAvailables, isLoading, isSuccess };
};

export const useAddEMR = () => {
  const queryClient = useQueryClient();
  const {
    mutate: addEMRs,
    isLoading,
    isSuccess,
  } = useMutation(addEMR, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["emr"]);
      toast.success(data.message);
    },
    onError: (error) => toast.error(error.response.data.message),
  });

  return { addEMRs, isLoading, isSuccess };
};

export const useGetEMR = (id) => {
  return useQuery(["emr"], () => getEMR(id));
};
