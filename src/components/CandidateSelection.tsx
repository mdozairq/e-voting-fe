"use client"
import React, { useEffect, useState } from 'react'
import ElectionList from './ElectionList';
import PartyCard from './PartyList';
import { useAppSelector } from '@/redux/hooks';
import { getAuthData, getElectionData } from '@/redux/selectors/app';
import CandidateDetailsForm from './CandidateDetailsForm';
import CandidateConfirmation from './CandidateConfirmation';
import ConfirmationDialog from './ConfirmationDialog';
import { useDispatch } from 'react-redux';
import { getElectionById, getPartyById, updateCandidateById } from '@/action/election';

enum Selection {
    Election,
    Party,
    Detail,
    Submit,
    Registered
}

const CandidateSelection = () => {
    const { current_election, current_party } = useAppSelector(getElectionData);
    const { candidate_data } = useAppSelector(getAuthData);
    const [currentSelection, setCurrentSelection] = useState<Selection>(Selection.Election);
    const [disabledPhase, setDisabledPhase] = useState<boolean>(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formData, setFormData] = useState<any>({
        assets: [] as string[],
        has_crime_records: false,
        is_accused: false,
    });

    const dispatch = useDispatch()

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };
    console.log("current_election:", current_election, "current_party:", current_party);

    const handleClickForward = () => {
        console.log();

        if (currentSelection === Selection.Submit) {
            setDisabledPhase(true)
        }
        else {
            if (current_election)
                setCurrentSelection((prevPhase) => prevPhase + 1);
        }
    };

    const handleClickBackward = () => {
        console.log();

        if (currentSelection === Selection.Submit) {
            setDisabledPhase(true)
        }
        else {
            if (current_election)
                setCurrentSelection((prevPhase) => prevPhase - 1);
        }
    };

    console.log("CAN:", candidate_data);

    useEffect(() => {
        if (candidate_data && candidate_data.is_registered) {
            setCurrentSelection(Selection.Submit)
        }

        if (candidate_data && !current_election) {
            dispatch(getElectionById(candidate_data.election_id))
        }

        if (candidate_data && !current_party) {
            dispatch(getPartyById(candidate_data.party_id))
        }
    }, [candidate_data, current_election, current_party])

console.log("formData", formData);


    const handleConfirm = () => {
        let candidate_payload = {
            party_id: current_party._id,
            registered_constituency_id: current_election.constituency._id,
            assets: formData!?.assets,
            has_crime_records: formData.has_crime_records,
            is_accused: formData.is_accused,
            election_id: current_election._id
        }
        dispatch(updateCandidateById(candidate_data.candidate_id, candidate_payload));

        setIsDialogOpen(false);
    };

    return (
        <>
            <ConfirmationDialog
                isOpen={isDialogOpen}
                title="Confirmation"
                message="Are you sure you want to proceed?"
                onCancel={handleCloseDialog}
                onConfirm={handleConfirm}
            />
            <div className='text-center items-center text-2xl text-slate-950 mt-2'>
                {candidate_data && !candidate_data.is_registered && (
                    currentSelection === Selection.Election ? "Select the Election" :
                        currentSelection === Selection.Party ? "Select A Party" :
                            currentSelection === Selection.Detail ? "Fill up the Details" :
                                "Are you want to Submit?")
                }
                <br />
                <hr className='h-0 bg-black m-1' />
            </div>
            <div>
                {currentSelection === Selection.Election && <ElectionList />}
                {currentSelection === Selection.Party && <PartyCard />}
                {currentSelection === Selection.Detail && <CandidateDetailsForm formData={formData} setFormData={setFormData} />}
                {currentSelection === Selection.Submit && <CandidateConfirmation setIsDialogOpen={setIsDialogOpen} isRegistered={candidate_data!?.is_registered}/>}
            </div>
            <div className='flex px-2 pb-2 justify-evenly '>
                {(currentSelection === Selection.Party || currentSelection === Selection.Detail) ?
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={handleClickBackward}>
                        Back
                    </button> : <></>}
                {(current_election && currentSelection !== Selection.Submit) ? <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={handleClickForward}>
                    Next
                </button> : <></>}

            </div>
        </>
    )
}

export default CandidateSelection