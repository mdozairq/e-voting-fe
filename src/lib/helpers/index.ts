import { ElectionPhase } from "../types"

export const phase_mapping = (phase: ElectionPhase): number => {
    const def_phase = {
        INITIALIZATION: 0,
        REGISTRATION: 1,
        VOTING: 2,
        RESULT: 3,
        DECLARED: 4
    }

    return def_phase[phase]
}