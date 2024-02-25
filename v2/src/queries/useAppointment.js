import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  appointment,
  doctorDetails,
  doctors,
  createAppointment,
  verifyPay,
  appointments,
  paidAppointments,
  getHistory,
  getPatientNotifications,
  updateHealthProfile,
  getPatientHealthProfile,
  getPatientSettings,
  updatePatientSettings,
  patientImageUpload,
  patientImageRemove,
  patientAppointmentDetails,
  patientUpdatePassword,
} from "../api/Patient";
import { hospitals } from "../api/Hospital";
import { toast } from "react-toastify";
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext/GlobalContext";
import {
  expertImageRemove,
  expertImageUpload,
  getExpertHistory,
  getExpertNotifications,
  getExpertSetting,
  getPaidAppointments,
  getPatientAppDetailsByDoctor,
  updateExpertSetting,
} from "../api/Expert";
import usePaystack from "../hooks/usePaystack";
import useFlutterwavePay from "../hooks/useFlutterwave";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const useAppointment = (expert = false) => {
  // const apps = expert ? getPaidAppointments : appointments;
  const axiosPrivates = useAxiosPrivate();
  const query = expert ? ["expert-appointment"] : ["patient-appointment"];
  return useQuery(["patient-appointment"], appointments(axiosPrivates));
};

export const useHospitals = () => {
  const axiosPrivates = useAxiosPrivate();
  return useQuery(["hospitals"], hospitals(axiosPrivates));
};

export const useDoctorsDetail = (id) => {
  const axiosPrivates = useAxiosPrivate();
  return useQuery(["doctor-details", id], () =>
    doctorDetails(axiosPrivates, id)
  );
};

export const useDoctors = () => {
  const axiosPrivates = useAxiosPrivate();
  return useQuery(["doctors"], doctors(axiosPrivates));
};

export const useAppointments = () => {
  const axiosPrivates = useAxiosPrivate();
  return useQuery(["appointment"], appointments(axiosPrivates));
};

export const usePaidAppointments = (expert) => {
  const axiosPrivates = useAxiosPrivate();
  const apps = expert
    ? getPaidAppointments(axiosPrivates)
    : paidAppointments(axiosPrivates);
  const query = expert ? ["expert-paid-App"] : ["paid-app"];
  return useQuery(query, apps);
};

export const useGetHistory = (expert = false) => {
  const axiosPrivates = useAxiosPrivate();
  const api = expert
    ? getExpertHistory(axiosPrivates)
    : getHistory(axiosPrivates);

  return useQuery(["history"], api);
};

export const useGetNotifications = (expert = false) => {
  const axiosPrivates = useAxiosPrivate();
  const api = expert
    ? getExpertNotifications(axiosPrivates)
    : getPatientNotifications(axiosPrivates);
  const query = expert ? ["expert-notify"] : ["patient-notify"];
  return useQuery(query, api);
};

export const useGetHealthProfile = () => {
  const axiosPrivates = useAxiosPrivate();
  return useQuery(["healthProfile"], getPatientHealthProfile(axiosPrivates));
};

export const useUpdateHealthProfile = () => {
  const axiosPrivates = useAxiosPrivate();
  const queryClient = useQueryClient();
  const {
    mutate: updateHealthProfiles,
    isLoading,
    isSuccess,
  } = useMutation(updateHealthProfile(axiosPrivates), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["healthProfile"]);
      toast.success(data.message);
    },
    onError: (error) => toast.error(error.response.data.message),
  });

  return {
    updateHealthProfiles,
    isLoading,
    isSuccess,
  };
};

export const useGetSettings = (expert = false) => {
  const axiosPrivates = useAxiosPrivate();
  const api = expert
    ? getExpertSetting(axiosPrivates)
    : getPatientSettings(axiosPrivates);

  const query = expert ? ["expertSettings"] : ["patientSettings"];

  console.log(api, query, "settings");
  return useQuery(query, api);
};

export const useUpdateSettings = (expert = false) => {
  const queryClient = useQueryClient();
  const axiosPrivates = useAxiosPrivate();
  const api = expert
    ? updatePatientSettings(axiosPrivates)
    : updateExpertSetting(axiosPrivates);

  const query = expert ? ["expertSettings"] : ["patientSettings"];
  const {
    mutate: updatePatientSetting,
    isLoading,
    isSuccess,
  } = useMutation(api, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(query);
      toast.success(data.message);
    },
    onError: (error) => toast.error(error.response.data.message),
  });
  return { updatePatientSetting, isLoading, isSuccess };
};

export const useImageUpload = (expert = false) => {
  const queryClient = useQueryClient();
  const axiosPrivates = useAxiosPrivate();
  const api = expert
    ? expertImageUpload(axiosPrivates)
    : patientImageUpload(axiosPrivates);

  const query = expert ? ["expertSettings"] : ["patientSettings"];
  const {
    mutate: ImageUploads,
    isLoading,
    isSuccess,
  } = useMutation(api, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(query);
      expert
        ? queryClient.invalidateQueries("expert-dashboard")
        : queryClient.invalidateQueries("dashboard");
      toast.success(data.message);
    },
    onError: (error) => toast.error(error.response.data.message),
  });

  return { ImageUploads, isLoading, isSuccess };
};

export const useImageRemove = (expert = false) => {
  const queryClient = useQueryClient();
  const axiosPrivates = useAxiosPrivate();
  const api = expert
    ? expertImageRemove(axiosPrivates)
    : patientImageRemove(axiosPrivates);

  const query = expert ? ["expertSettings"] : ["patientSettings"];
  const {
    mutate: ImageRemoves,
    isLoading,
    isSuccess,
  } = useMutation(api, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(query);
      expert
        ? queryClient.invalidateQueries("expert-dashboard")
        : queryClient.invalidateQueries("dashboard");
      toast.success(data.message);
    },
    onError: (error) => toast.error(error.response.data.message),
  });

  return { ImageRemoves, isLoading, isSuccess };
};

export const useExpertGetPatientAppDetails = (id) => {
  const axiosPrivates = useAxiosPrivate();
  return useQuery(["appointment"], () =>
    getPatientAppDetailsByDoctor(axiosPrivates, id)
  );
};

export const usePatientUpdatePassword = () => {
  // const queryClient = useQueryClient();
  const axiosPrivates = useAxiosPrivate();
  const {
    mutate: patientUpdatePasswords,
    isLoading,
    isSuccess,
  } = useMutation(patientUpdatePassword(axiosPrivates), {
    onSuccess: (data) => {
      // queryClient.invalidateQueries(["patientSettings"]);
      toast.success(data.message);
    },
    onError: (error) => toast.error(error.response.data.message),
  });

  return { patientUpdatePasswords, isLoading, isSuccess };
};

export const useCreateAppointment = () => {
  const { setAppointmentDetails } = useContext(GlobalContext);
  const axiosPrivates = useAxiosPrivate();
  const {
    mutate: createAppointments,
    isLoading,
    isSuccess,
  } = useMutation(createAppointment(axiosPrivates), {
    onSuccess: (data) => {
      setAppointmentDetails(data?.Appointments);
      localStorage.setItem("app", JSON.stringify(data.Appointments));
      toast.success(data.message);
    },
    onError: (error) => toast.error(error.response.data.message),
  });

  return {
    createAppointments,
    isLoading,
    isSuccess,
  };
};

export const usePatientAppointmentDetails = (patientDetails, paymentType) => {
  const axiosPrivates = useAxiosPrivate();
  const payStack = usePaystack(patientDetails);
  const payFlutter = useFlutterwavePay(patientDetails);
  const {
    mutate: PatientAppDetails,
    isLoading,
    isSuccess,
  } = useMutation(patientAppointmentDetails(axiosPrivates), {
    onSuccess: (data) => {
      paymentType === "paystack" ? payStack() : payFlutter();
      toast.success(data.message);
    },
    onError: (error) => toast.error(error.response.data.message),
  });

  return {
    PatientAppDetails,
    isLoading,
    isSuccess,
  };
};

export const useVerifyPay = () => {
  const axiosPrivates = useAxiosPrivate();
  const { setAppointmentDetails } = useContext(GlobalContext);

  const {
    mutate: verifyPays,
    isLoading,
    isSuccess,
  } = useMutation(verifyPay(axiosPrivates), {
    onSuccess: (data) => {
      console.log(data, "credbhs");
      // localStorage.setItem("app", JSON.stringify(data.Appointments));
      //setAppointmentDetails(data.Appointments);

      toast.success(data.message);
      //starting from here
    },
    onError: (error) => toast.error(error.message),
  });

  return {
    verifyPays,
    isLoading,
    isSuccess,
  };
};
