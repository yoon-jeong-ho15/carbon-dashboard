import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPosts, createOrUpdatePost } from "../lib/api";
import type { Post } from "../lib/type";

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 5 * 60 * 1000, // 5분간 fresh
    gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postData: Omit<Post, "id"> & { id?: string }) => createOrUpdatePost(postData),
    onSuccess: () => {
      // posts 캐시 무효화하여 목록 새로고침
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}