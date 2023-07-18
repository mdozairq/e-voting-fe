"use client"
import { Roles, RouterButtonProps } from "@/lib/types"
import { useAppDispatch } from "@/redux/hooks";
import { setAppState } from "@/redux/slices/appStateReducer";
import { useRouter } from 'next/navigation';

const RouterButton = ({ title, containerStyle, btnType, path }: RouterButtonProps) => {
   
    const router = useRouter();

    const handleClick = () => {
        router.push(path);
        console.log(path);
    }

    return (
        <button
            disabled={false}
            type={btnType || 'button'}
            className={`custom-btn ${containerStyle}`}
            onClick={handleClick}
        >
            <span className={`flex-1`}>{title}</span>
        </button>
    )
}

export default RouterButton