import { launchpadApi } from "../api";
import { useQuery } from "@tanstack/react-query";

type PaginationRequest = {
  page?: number;
  limit?: number;
};

export const useGetAllCollections = (pagination: PaginationRequest) => {
  return useQuery({
    queryKey: ["collections", pagination],
    queryFn: () =>
      launchpadApi.get("/collection/all", { searchParams: pagination }).json(),
  });
};

export const getAllDeployedCollections = (pagination: PaginationRequest) => {
  return useQuery({
    queryKey: ["deployedCollections", pagination],
    queryFn: () =>
      launchpadApi
        .get("/collection/all-deployed-collection", {
          searchParams: pagination,
        })
        .json(),
  });
};
