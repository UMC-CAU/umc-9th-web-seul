import { useEffect, useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList.ts";
import { PAGINATION_ORDER } from "../enums/common.ts";
import { useInView } from "react-intersection-observer";
import Card from "../components/LpCard/LpCard.tsx";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList.tsx";

const HomePage = () => {
    /*const {data, isPending, error} = useGetLpList({});*/
    const [search, setSearch] = useState("");

    const {data:lps, isFetching, hasNextPage, isPending, fetchNextPage, isError} = 
    useGetInfiniteLpList(50, search, PAGINATION_ORDER.desc);

    const {ref, inView} = useInView({
        threshold: 0,
    });

    useEffect(() => {
        if (inView) {
           !isFetching && hasNextPage && fetchNextPage();
        }
    },[inView, hasNextPage, fetchNextPage, isFetching]);

    return (
        <div className="container mx-auto px-4 py-6">
        <input value={search} onChange={(e) => setSearch(e.target.value)}></input>
        <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"}>
            {isPending && <LpCardSkeletonList count={20}/>}
            {lps
            ?.pages.map((page) => page.data.data)
            ?.flat()
            ?.map((lp) => <Card lp={lp} key={lp.id}/>)}
            {isFetching && <LpCardSkeletonList count={20}/>}
        </div>
        <div ref={ref} className="h-2"></div>
        </div>
    );
};

export default HomePage;