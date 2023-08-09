import { useAppSelector } from '@/redux/hooks';
import { getAuthData } from '@/redux/selectors/app';
import React, { useEffect, useState } from 'react';

interface CandidateInfoProps {
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>; 
}

const CandidateDetailsForm: React.FC<CandidateInfoProps> = ({formData, setFormData}: CandidateInfoProps) => {
    const { candidate_data } = useAppSelector(getAuthData);
    

    useEffect(() => {
        if (candidate_data) {
            setFormData({
                assets: candidate_data.assets || [], 
                has_crime_records: candidate_data.has_crime_records,
                is_accused: candidate_data.is_accused
            });
        }
    }, [candidate_data]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value, type } = event.target;
        if (type === 'checkbox') {
            setFormData((prevData: any) => ({
                ...prevData,
                [name]: (event.target as HTMLInputElement).checked,
            }));
        } else {
            setFormData((prevData: any) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    // const handleSubmit = (event: React.FormEvent) => {
    //     event.preventDefault();
    //     // Handle form submission here
    //     console.log(formData);
    // };

    return (
        candidate_data && (
            <div className="bg-white rounded shadow-md p-4 md:p-6 m-4">
                <form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-gray-500 block mb-1">Assets:</label>
                            <input
                                type="text"
                                id="assets"
                                name="assets"
                                value={formData.assets}
                                onChange={handleInputChange}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div>
                            <label className="text-gray-500 block mb-1">Has Crime Records:</label>
                            <input
                                type="checkbox"
                                id="has_crime_records"
                                name="has_crime_records"
                                checked={formData.has_crime_records}
                                onChange={handleInputChange}
                                className="w-4 h-4 mr-2"
                            />
                        </div>
                        <div>
                            <label className="text-gray-500 block mb-1">Is Accused:</label>
                            <input
                                type="checkbox"
                                id="is_accused"
                                name="is_accused"
                                checked={formData.is_accused}
                                onChange={handleInputChange}
                                className="w-4 h-4 mr-2"
                            />
                        </div>
                    </div>
                </form>
            </div>
        )
    );
};

export default CandidateDetailsForm;
