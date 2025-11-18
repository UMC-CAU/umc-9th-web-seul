import {useParams} from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { Heart } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";

const LpDetailPage = () => {
    const {lpId} = useParams();
    const {data: lp, isPending, isError} = useGetLpDetail({lpId: Number(lpId)});
    const {accessToken} = useAuth();

    const {data:me} = useGetMyInfo(accessToken);
    const {mutate:likeMutate} = usePostLike();
    const {mutate:dislikeMutate} = useDeleteLike();

    const isLiked = lp?.data.likes.map((like) => like.userId).includes(me?.data.id as number);

    const handleLike = () => {
        likeMutate({lpId: Number(lpId)});
    };
    
    const handleDislike = () => {
        dislikeMutate({lpId: Number(lpId)});
    };

    if (isPending && isError) {
        return <></>
    }

    return (<div className={"mt-12"}>
        <h1>{lp?.data.title}</h1>
        <img src={lp?.data.thunbnail} alt={lp?.data.title} />
        <p>{lp?.data.content}</p>

        <button onClick={isLiked ? handleDislike : handleLike}>
            <Heart color={isLiked ? "red" : "black"} fill={isLiked ? "red" : "transparent"}/>
        </button>
    </div>
    );
};

export default LpDetailPage;