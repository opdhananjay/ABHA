export const formatDOB = (
  dob: string
) => {
  if (!dob) return "";

  if (dob.includes("-")) {
    return dob.replaceAll("-", "");
  }

  return dob;
};

export const calculateAge = (dob: string) => {
  if (!dob) return "";

  const birthDate = new Date(dob);
  const today = new Date();

  let age =
    today.getFullYear() -
    birthDate.getFullYear();

  const monthDiff =
    today.getMonth() -
    birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 &&
      today.getDate() <
        birthDate.getDate())
  ) {
    age--;
  }

  return `${String(age).padStart(3, "0")}:00:00`;
};


export const getSalutation = (
  gender: string
) => {
  const normalized =
    gender?.toUpperCase();

  if (normalized === "M") return "004";
  if (normalized === "F") return "005";

  return "004";
};

export const getDistrictId = (
  districtName: string
) => {
  const districtMap: Record<
    string,
    string
  > = {
    central: "414",
    thane: "415",
    mumbai: "416"
  };

  return (
    districtMap[
      districtName
        ?.toLowerCase()
        ?.trim()
    ] || "414"
  );
};

export const getRegionId = (
  stateName: string
) => {
  const stateMap: Record<
    string,
    string
  > = {
    delhi: "022",
    maharashtra: "023"
  };

  return (
    stateMap[
      stateName
        ?.toLowerCase()
        ?.trim()
    ] || "022"
  );
};

export const getCityId = () => {
  return "004";
};

export const getCountryId = () => {
  return "079";
};