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
  return useQuery(["hospitals"], hospitals);
};

export const useDoctorsDetail = (id) => {
  return useQuery(["doctor-details", id], () => doctorDetails(id));
};

export const useDoctors = () => {
  return useQuery(["doctors"], doctors);
};

export const useAppointments = () => {
  return useQuery(["appointment"], appointments);
};

export const usePaidAppointments = (expert) => {
  const apps = expert ? getPaidAppointments : paidAppointments;
  const query = expert ? ["expert-paid-App"] : ["paid-app"];
  return useQuery(query, apps);

  // return useQuery(["paid-App"], apps);
};

export const useGetHistory = (expert = false) => {
  const api = expert ? getExpertHistory : getHistory;
  return useQuery(["history"], api);
};

export const useGetNotifications = (expert = false) => {
  const api = expert ? getExpertNotifications : getPatientNotifications;
  const query = expert ? ["expert-notify"] : ["patient-notify"];
  return useQuery(query, api);
};

export const useGetHealthProfile = () => {
  return useQuery(["healthProfile"], getPatientHealthProfile);
};

export const useUpdateHealthProfile = () => {
  const queryClient = useQueryClient();
  const {
    mutate: updateHealthProfiles,
    isLoading,
    isSuccess,
  } = useMutation(updateHealthProfile, {
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
  const api = expert ? getExpertSetting : getPatientSettings;

  const query = expert ? ["expertSettings"] : ["patientSettings"];

  console.log(api, query, "settings");
  return useQuery(query, api);
};

export const useUpdateSettings = (expert = false) => {
  const queryClient = useQueryClient();
  const api = expert ? updatePatientSettings : updateExpertSetting;

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
  const api = expert ? expertImageUpload : patientImageUpload;

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
  const api = expert ? expertImageRemove : patientImageRemove;

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
  return useQuery(["appointment"], () => getPatientAppDetailsByDoctor(id));
};

export const usePatientUpdatePassword = () => {
  // const queryClient = useQueryClient();
  const {
    mutate: patientUpdatePasswords,
    isLoading,
    isSuccess,
  } = useMutation(patientUpdatePassword, {
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
  const {
    mutate: createAppointments,
    isLoading,
    isSuccess,
  } = useMutation(createAppointment, {
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
  const payStack = usePaystack(patientDetails);
  const payFlutter = useFlutterwavePay(patientDetails);
  const {
    mutate: PatientAppDetails,
    isLoading,
    isSuccess,
  } = useMutation(patientAppointmentDetails, {
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
  const { setAppointmentDetails } = useContext(GlobalContext);

  const {
    mutate: verifyPays,
    isLoading,
    isSuccess,
  } = useMutation(verifyPay, {
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
