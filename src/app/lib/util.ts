const sourceColorMap: Record<string, string> = {
  gasoline: "bg-red-400",
  diesel: "bg-zinc-500",
  lpg: "bg-green-500",
  electricity: "bg-yellow-400",
};

const companyColorMap: Record<string, string> = {
  c1: "#2563EB", // blue-600
  c2: "#059669", // emerald-600
  c3: "#DC2626", // red-600
  c4: "#D97706", // amber-600
  c5: "#7C3AED", // violet-600
  c6: "#BE185D", // rose-700
  c7: "#4338CA", // indigo-700
  c8: "#0F766E", // teal-700
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
