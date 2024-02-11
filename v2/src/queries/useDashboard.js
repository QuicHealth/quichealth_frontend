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
  const axiosPrivates = useAxiosPrivate();
  const {
    mutate: setAvailables,
    isLoading,
    isSuccess,
  } = useMutation(setAvailability(axiosPrivates), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["expert-dashboard"]);
      toast.success(data?.message);
    },
    onError: (error) => toast.error(error.response.data.message),
  });

  return { setAvailables, isLoading, isSuccess };
};

export const useAddEMR = () => {
  const axiosPrivates = useAxiosPrivate();
  const queryClient = useQueryClient();
  const {
    mutate: addEMRs,
    isLoading,
    isSuccess,
  } = useMutation(addEMR(axiosPrivates), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["emr"]);
      toast.success(data.message);
    },
    onError: (error) => toast.error(error.response.data.message),
  });

  return { addEMRs, isLoading, isSuccess };
};

export const useGetEMR = (id) => {
  const axiosPrivates = useAxiosPrivate();
  return useQuery(["emr"], () => getEMR(axiosPrivates, id));
};
