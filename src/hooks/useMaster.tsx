import { useState } from "react";
import toast from "react-hot-toast";

import {
  GetSalutationsService,
  GetCountriesService,
  GetStatesService,
  GetDistrictsService,
  GetCitiesService,
  GetAreasService
} from "../services/master.service";

const useMaster = () => {
  const [loading, setLoading] = useState(false);

  const [salutations, setSalutations] = useState<any>([]);
  const [countries, setCountries] = useState<any>([]);
  const [states, setStates] = useState<any>([]);
  const [districts, setDistricts] = useState<any>([]);
  const [cities, setCities] = useState<any>([]);
  const [areas, setAreas] = useState<any>([]);

  // ---------------- Salutation ----------------
  const getSalutations = async () => {
    try {
      setLoading(true);

      const response = await GetSalutationsService();

      if (response?.data) {
        setSalutations(response.data);
      }

      return response?.data || [];
    } catch (error) {
      toast.error("Failed to fetch salutations");
      console.error(error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Country ----------------
  const getCountries = async () => {
    try {
      setLoading(true);

      const response = await GetCountriesService();

      if (response?.data) {
        setCountries(response.data);
      }

      return response?.data || [];
    } catch (error) {
      toast.error("Failed to fetch countries");
      console.error(error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // ---------------- State ----------------
  const getStates = async () => {
    try {
      setLoading(true);

      const response = await GetStatesService();

      if (response?.data) {
        setStates(response.data);
      }

      return response?.data || [];
    } catch (error) {
      toast.error("Failed to fetch states");
      console.error(error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // ---------------- District ----------------
  const getDistricts = async () => {
    try {
      setLoading(true);

      const response = await GetDistrictsService();

      if (response?.data) {
        setDistricts(response.data);
      }

      return response?.data || [];
    } catch (error) {
      toast.error("Failed to fetch districts");
      console.error(error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // ---------------- City ----------------
  const getCities = async () => {
    try {
      setLoading(true);

      const response = await GetCitiesService();

      if (response?.data) {
        setCities(response.data);
      }

      return response?.data || [];
    } catch (error) {
      toast.error("Failed to fetch cities");
      console.error(error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Area ----------------
  const getAreas = async () => {
    try {
      setLoading(true);

      const response = await GetAreasService();

      if (response?.data) {
        setAreas(response.data);
      }

      return response?.data || [];
    } catch (error) {
      toast.error("Failed to fetch areas");
      console.error(error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,

    salutations,
    countries,
    states,
    districts,
    cities,
    areas,

    getSalutations,
    getCountries,
    getStates,
    getDistricts,
    getCities,
    getAreas
  };
};

export default useMaster;