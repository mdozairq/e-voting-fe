import { Roles } from "../types";



export const authenticateAdmin = (current_role: Roles): boolean => {
  return current_role === Roles.ADMIN
};

export const authenticateVoter = (current_role: Roles): boolean => {
  return current_role === Roles.VOTER
};

export const authenticateCandidate = (current_role: Roles): boolean => {
  return current_role === Roles.CANDIDATE
};

export const authenticateGuest = (current_role: Roles): boolean => {
  return current_role === Roles.GUEST
};
