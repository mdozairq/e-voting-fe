"use client"
import React, { useEffect, useState } from 'react';
import PhaseProgress from './PhaseProgress';
import { useAppSelector } from '@/redux/hooks';
import { getElectionData } from '@/redux/selectors/app';
import { phase_mapping } from '@/lib/helpers';
import { useDispatch } from 'react-redux';
import { initializeElection, updateELectionPhase } from '@/action/election';
import { ElectionPhase, InitializeElectionDTO, UpdateElectionDto } from '@/lib/types';
import SetTime from './SetTime';

interface ElectionDetailProps {
  data: any;
}

const ElectionDetail: React.FC = () => {
  const electionTypes = ['GENERAL', 'STATE', 'MUNICIPAL', 'PANCHAYAT'];
  const { current_election } = useAppSelector(getElectionData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  console.log(current_election);

  const [constituency, setConstituency] = useState({
    _id: '',
    state: '',
    country: '',
    pincode: ''
  })
  const dispatch = useDispatch()

  // Sample data for constituencies
  const constituencies = [
    {
      "_id": "64cb2f3f864aa2aed2a864b8",
      "city": "Gaya",
      "district": "Gaya",
      "state": "Bihar",
      "country": "India",
      "pincode": "823001"
    },
    {
      "_id": "64cb2f99864aa2aed2a864bb",
      "city": "Muzzafarpur",
      "district": "Muzzafarpur",
      "state": "Bihar",
      "country": "India",
      "pincode": "842002"
    },
    // Add more constituencies as needed
  ];

  const [formData, setFormData] = useState({
    election_name: '',
    description: '',
    election_type: '',
    constituency: '',
    start_date: '',
    end_date: '',
    start_time: '',
    end_time: '',
    election_year: '',
    is_active: true,
    is_bypoll: false,
  });

  const [timeData, setTimeData] = useState({
    start_date: '',
    end_date: '',
    start_time: '',
    end_time: '',
  });

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    if (formData.constituency) {
      let current_constituency: any = constituencies.find((ele) => formData.constituency === ele._id ? ele : {});
      setConstituency(current_constituency)
    }

  }, [formData.constituency]);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Dispatch the form data using Redux here
    if (formData.election_name !== '' && formData.description !== '' && formData.election_type !== '' && formData.constituency !== "" && formData.election_year !== "") {
      const form_payload = {
        ...formData,
        start_date: new Date(`${formData.start_date}T${formData.start_time}:00Z`).toISOString(),
        end_date: new Date(`${formData.end_date}T${formData.end_time}:00Z`).toISOString(),
      }
      dispatch(initializeElection(form_payload as InitializeElectionDTO))
    }
    console.log(formData);
  };

  const handleConfirm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Dispatch the form data using Redux here
    if (timeData.start_date !== '' && timeData.end_date !== '' && timeData.start_time !== '' && timeData.start_time !== "") {
      const form_payload = {
        start_date: new Date(`${timeData.start_date}T${timeData.start_time}:00Z`).toISOString(),
        end_date: new Date(`${timeData.end_date}T${timeData.end_time}:00Z`).toISOString(),
      }
      dispatch(updateELectionPhase(current_election._id, form_payload as UpdateElectionDto))
    }
    console.log(timeData);
    setIsDialogOpen(false);
  }

  return (
    <>
      <SetTime
        isOpen={isDialogOpen}
        title="Confirmation"
        message="Are you sure you want to proceed?"
        onCancel={handleCloseDialog}
        onConfirm={handleConfirm} timeData={timeData}
        setTimeData={setTimeData} />
      <div className="max-w-lg w-full mx-auto items-center">
        <div className="bg-white p-8 rounded shadow-md m-8">
          {current_election && current_election ? (
            <>
              <h1 className="text-2xl font-bold mb-1">Election Details</h1>
              <hr />
              <br />
              <p className="mb-2">
                <span className="font-semibold">Election Name:</span> {current_election.election_name}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Description:</span> {current_election.description}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Election Type:</span> {current_election.election_type}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Election Year:</span> {current_election.election_year}
              </p>
              <p className="mb-4">
                <span className="font-semibold">Bypoll Election:</span> {current_election.is_bypoll ? 'ACTIVE' : 'INACTIVE'}
              </p>
              <p className="mb-4">
                <span className="font-semibold">Election District:</span> {current_election.constituency.district}
              </p>
              <p className="mb-4">
                <span className="font-semibold">Election State:</span> {current_election.constituency.state}
              </p>
              <p className="mb-4">
                <span className="font-semibold">Election Country:</span> {current_election.constituency.country}
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-1">Election Initialize</h1>
              <hr />
              <br />
              <form autoComplete="off" onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label htmlFor="electionName" className="block font-semibold mb-2">
                    Election Name
                  </label>
                  <input
                    type="text"
                    id="electionName"
                    name="electionName"
                    placeholder="Election Name"
                    className="w-full border rounded p-2"
                    value={formData.election_name}
                    onChange={(e) => setFormData({ ...formData, election_name: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block font-semibold mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Description"
                    className="w-full border rounded p-2"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="electionType" className="block font-semibold mb-2">
                    Election Type
                  </label>
                  <select
                    id="electionType"
                    name="electionType"
                    className="w-full border rounded p-2"
                    value={formData.election_type}
                    onChange={(e) => setFormData({ ...formData, election_type: e.target.value })}
                  >
                    <option value="">Select Election Type</option>
                    {electionTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="startDate" className="block font-semibold mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    className="w-full border rounded p-2"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="startTime" className="block font-semibold mb-2">
                    Start Time
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    className="w-full border rounded p-2"
                    value={formData.start_time}
                    onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="endDate" className="block font-semibold mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    className="w-full border rounded p-2"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="endTime" className="block font-semibold mb-2">
                    End Time
                  </label>
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    className="w-full border rounded p-2"
                    value={formData.end_time}
                    onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="electionYear" className="block font-semibold mb-2">
                    Election Year
                  </label>
                  <input
                    type="text"
                    id="electionYear"
                    name="electionYear"
                    placeholder="Election Year"
                    className="w-full border rounded p-2"
                    value={formData.election_year}
                    onChange={(e) => setFormData({ ...formData, election_year: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="district" className="block font-semibold mb-2">
                    District
                  </label>
                  <select
                    id="district"
                    name="district"
                    className="w-full border rounded p-2"
                    value={formData.constituency}
                    onChange={(e) => setFormData({ ...formData, constituency: e.target.value })}
                  >
                    <option value="">Select District</option>
                    {constituencies.map((district) => (
                      <option key={district._id} value={district._id}>
                        {district.district}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Auto-populated fields */}
                <div className="mb-4">
                  <label htmlFor="state" className="block font-semibold mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    placeholder="State"
                    className="w-full border rounded p-2"
                    value={constituency && constituency?.state}
                    readOnly
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="country" className="block font-semibold mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    placeholder="Country"
                    className="w-full border rounded p-2"
                    value={constituency && constituency?.country}
                    readOnly
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="isBypoll" className="block font-semibold mb-2">
                    Bypoll Election
                  </label>
                  <input
                    type="checkbox"
                    id="isBypoll"
                    name="isBypoll"
                    className="w-4 h-4 mr-2 border rounded"
                    checked={formData.is_bypoll}
                    onChange={(e) => setFormData({ ...formData, is_bypoll: e.target.checked })}
                  />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full">
                  Initialize
                </button>
              </form>
            </>
          )}
        </div>
        {current_election &&  current_election.election_phase !== ElectionPhase.DECLARED && <button className="bg-blue-500 text-white px-4 py-2 rounded w-full" onClick={() => setIsDialogOpen(true)}>Next Phase</button>}
      </div>
    </>
  );
};

export default ElectionDetail;
