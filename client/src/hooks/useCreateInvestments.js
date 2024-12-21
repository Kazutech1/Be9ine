import axios from 'axios';

const useCreateInvestmentPlan = () => {
  const createInvestmentPlan = async (planData) => {
    const response = await axios.post('/api/investments', planData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  };

  return { createInvestmentPlan };
};

export default useCreateInvestmentPlan;
