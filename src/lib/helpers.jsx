import { useSession } from "./auth-client";

//capitalize first character
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// truncate text
export const truncate = (str, length) =>
  str.length > length ? str.slice(0, length) + "..." : str;

//get user - client side
export const useSessionClient = () => {
  const { data: session, isPending } = useSession();
  return {
    user: session?.user,
    isPending,
  };
};

//format date
export const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

//convert to money symbol
export const currencySymbol = (currency) => {
  const symbol =
    {
      usd: "$",
      eur: "€",
      gbp: "£",
    }[currency] || currency.toUpperCase();
  return symbol;
};
