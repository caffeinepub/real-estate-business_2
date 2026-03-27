import { useQuery } from "@tanstack/react-query";
import type { Property } from "../backend.d";
import { useActor } from "./useActor";

export function useFeaturedProperties() {
  const { actor, isFetching } = useActor();
  return useQuery<Property[]>({
    queryKey: ["featuredProperties"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedProperties();
    },
    enabled: !!actor && !isFetching,
  });
}
