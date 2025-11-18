import { useCallback, useMemo, useState } from "react";
import "./App.css";
import { useListPosts } from "./services/posts";
import type { IPost } from "./types";

const MAX_PER_PAGE = 10;

function App() {
	const { isLoading, isError, data } = useListPosts({});

	const [currentPage, setCurrentPage] = useState(1);

	const paginate = useCallback(() => {
		const start = (currentPage - 1) * MAX_PER_PAGE;

		return data.slice(start, MAX_PER_PAGE + start);
	}, [currentPage, data]);

	const currentView = currentPage * MAX_PER_PAGE;
	const canNext = data.length > currentView;
	const canPrev = currentPage > 1;

	const onNextPage = () => {
		setCurrentPage((prev) => prev + 1);
	};

	const onPrevPage = () => {
		setCurrentPage((prev) => prev - 1);
	};

	const posts = useMemo(() => {
		return paginate();
	}, [paginate]);

	return (
		<>
			<p>posts</p>

			{isError && <p style={{ color: "red" }}>*Showing default data*</p>}

			{isLoading ? (
				<>Loading...</>
			) : (
				posts.map((item: IPost) => (
					<div
						style={{
							display: "flex",
							gap: 2,
						}}
					>
						<p>{item.id}</p>
						<p>{item.title}</p>
					</div>
				))
			)}

			<div
				style={{
					display: "flex",
					gap: 20,
				}}
			>
				<button disabled={!canPrev} onClick={onPrevPage}>
					prev
				</button>
				<button disabled={!canNext} onClick={onNextPage}>
					next
				</button>
			</div>
		</>
	);
}

export default App;
