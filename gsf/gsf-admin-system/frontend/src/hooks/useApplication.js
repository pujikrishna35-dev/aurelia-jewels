import { useState } from 'react';
import applicationService from '../services/applicationService';

export const useApplication = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitApplication = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await applicationService.submitLead(formData);
      if (res.success) {
        setSuccess(true);
        return res;
      } else {
        setError(res.message || 'Submission failed');
        return res;
      }
    } catch (err) {
      setError('Unexpected error during application submission.');
      return { success: false, message: 'Unexpected error.' };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    submitApplication,
  };
};

export default useApplication;
