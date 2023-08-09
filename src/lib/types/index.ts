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

export interface CandidateSignUp {
    username: string,
    uid: string,
    email: string,
    password: string
}

export interface CandidateSignIn {
    username: string,
    password: string
}

export interface AdminLogIn {
    email: string,
    password: string
}

export enum ElectionPhase {
    INITIALIZATION = 'INITIALIZATION',
    REGISTRATION = 'REGISTRATION',
    VOTING = 'VOTING',
    RESULT = 'RESULT'
}

export enum ElectionType {
    GENERAL = 'GENERAL',
    STATE = 'STATE',
    MUNICIPAL = 'MUNICIPAL',
    PANCHAYAT = 'PANCHAYAT'
}
export interface InitializeElectionDTO {
    election_name: string,
    description: string,
    election_type: ElectionType | '',
    constituency: string,
    start_date: Date | '',
    end_date: Date | '',
    election_year: string,
    is_active: boolean,
    is_bypoll: boolean
}

export interface PartyData {
    _id: string;
    party_name: string;
    party_type: string;
    party_slogan: string;
    party_logo_url: string;
    is_ruling: boolean;
    is_disqualified: boolean;
    created_at: string;
    updated_at: string;
  }


  export interface CandidateUpdateDto {
    _id: string;
    email: string;
    username: string;
    phone: string;
    password: string;
    voter_id: string;
    party_id: string;
    election_id: string;
    registered_constituency_id: string;
    assets: string[];
    has_crime_records: boolean;
    is_accused: boolean;
    is_eligible: boolean;
    is_registered: boolean;
}