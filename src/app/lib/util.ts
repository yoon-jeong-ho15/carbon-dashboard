const sourceColorMap: Record<string, string> = {
  gasoline: "bg-red-400",
  diesel: "bg-zinc-500",
  lpg: "bg-green-500",
  electricity: "bg-yellow-400",
  naturalgas: "bg-purple-500",
  coal: "bg-gray-800",
  kerosene: "bg-orange-500",
  biomass: "bg-emerald-500",
  solar: "bg-amber-500",
  wind: "bg-cyan-500",
  nuclear: "bg-indigo-500",
  hydro: "bg-teal-500",
};

const companyColorMap: Record<string, string> = {
  c1: "#2563EB", // blue-600 (더 진한 파란색)
  c2: "#059669", // emerald-600 (더 진한 초록색)
  c3: "#DC2626", // red-600 (더 진한 빨간색)
  c4: "#D97706", // amber-600 (더 진한 주황색)
  c5: "#7C3AED", // violet-600 (더 진한 보라색)
  c6: "#BE185D", // rose-700 (진한 장미색)
  c7: "#4338CA", // indigo-700 (더 진한 남색)
  c8: "#0F766E", // teal-700 (더 진한 청록색)
};

export const getSourceColor = (name: string): string => {
  return sourceColorMap[name.toLowerCase()] || "bg-gray-500";
};

export const getCompanyColor = (id: string): string => {
  return companyColorMap[id.toLowerCase()] || "#6B7280"; // gray-500
};

export const getMonth = (month: string) => {
  const monthMap: Record<string, string> = {
    "1": "Jan",
    "2": "Feb",
    "3": "Mar",
    "4": "Apr",
    "5": "May",
    "6": "Jun",
    "7": "Jul",
    "8": "Aug",
    "9": "Sep",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec",
  };
  return monthMap[month];
};
