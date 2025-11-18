import { useQuery } from "@tanstack/react-query";

export function useListPosts(params?: Record<string, unknown>) {
	return useQuery({
		initialData: [
			{
				id: 1,
				title: "title1",
			},
			{
				id: 2,
				title: "title2",
			},
			{
				id: 3,
				title: "title3",
			},
			{
				id: 4,
				title: "title4",
			},
		],
		queryKey: ["posts", params],
		queryFn: async () => {
			const data = await fetch("https://jsonplaceholder.typicode.com/posts");

			const posts = await data.json();

			return posts;
		},
	});
}
