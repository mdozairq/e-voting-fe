import { MouseEventHandler } from "react";

export enum Roles {
    ADMIN = 'ADMIN',
    GUEST = 'GUEST',
    VOTER = 'VOTER',
    CANDIDATE = 'CANDIDATE',
}

export interface CustomButtonProps {
    title: string;
    containerStyle?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    btnType?: "button" | "submit" | "reset" | undefined;
}

export interface RouterButtonProps {
    title: string;
    containerStyle?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    path: string;
    btnType?: "button" | "submit" | "reset" | undefined;
    role?: Roles;
}

export interface HeroProps {
    handleVoterClick?: MouseEventHandler<HTMLButtonElement>;
    handleCandidateClick?: MouseEventHandler<HTMLButtonElement>;
    handleAdminClick?: MouseEventHandler<HTMLButtonElement>;
}