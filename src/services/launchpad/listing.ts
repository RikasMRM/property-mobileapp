import { useQuery } from "@tanstack/react-query";
import { launchpadApi } from "../api";

export const useGetAllListingsByCollection = (contractAddress: string) => {
  return useQuery({
    queryKey: ["listings", contractAddress],
    queryFn: () =>
      launchpadApi
        .get(`/listing/all-nfts-by-collection/${contractAddress}`)
        .json(),
  });
};
