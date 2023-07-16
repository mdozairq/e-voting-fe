"use client"
import { Roles, RouterButtonProps } from "@/lib/types"
import { useAppDispatch } from "@/redux/hooks";
import { setAppState } from "@/redux/slices/appStateReducer";
import Image from "next/image"
import { useRouter } from 'next/navigation';

const RouterButton = ({ title, containerStyle, btnType, path, role }: RouterButtonProps) => {
    const dispatch = useAppDispatch()
    const router = useRouter();

    const handleClick = () => {
        router.push(path);
        console.log(path, role);
        dispatch({ type: setAppState, payload: { title: "current_role", value: role } });
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