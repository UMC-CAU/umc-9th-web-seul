import useGetLpList from "../hooks/queries/useGetLpList.ts";

const HomePage = () => {
    const {data, isPending, error} = useGetLpList({});

    return (
        <div>
            {data?.data.data.map((lp) => <h1>{lp.title}</h1>)};
        </div>
    );
};

export default HomePage;