import apiClient from "./apiClient";

// Salutation Master
export const GetSalutationsService = () => {
  return apiClient.get("/master/salutation");
};

// Country Master
export const GetCountriesService = () => {
  return apiClient.get("/master/country");
};

// State Master
export const GetStatesService = () => {
  return apiClient.get("/master/state");
};

// District Master
export const GetDistrictsService = () => {
  return apiClient.get("/master/district");
};

// City Master
export const GetCitiesService = () => {
  return apiClient.get("/master/city");
};

// Area Master
export const GetAreasService = () => {
  return apiClient.get("/master/area");
};