import { useQuery } from "@tanstack/react-query";
import axios from "./axiosConfig";

const fetchData = async ({ queryKey }) => {
    const [endpoint] = queryKey;
    if (!endpoint) throw new Error("Endpoint is required");

    const response = await axios.get(`/${endpoint}`);
    return response.data;
};

export const useApiData = ({ endpoint, options = {} }) => {
    return useQuery({
        queryKey: [endpoint || "skip"], // Ensure a stable key to avoid React Hooks rule errors
        queryFn: endpoint ? fetchData : () => Promise.resolve([]), // Prevent fetch if endpoint is missing
        enabled: !!endpoint, // Disable fetching if endpoint is missing
        ...options,
    });
};
