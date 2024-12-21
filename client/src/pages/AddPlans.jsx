import React, { useState } from "react";
import useCreateInvestmentPlan from "../hooks/useCreateInvestments";

const AddPlan = () => {
  const { createInvestmentPlan } = useCreateInvestmentPlan();
  const [planData, setPlanData] = useState({
    name: "",
    image: "",
    type: "crypto",
    minDeposit: "",
    duration: "",
    expectedReturn: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlanData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError("");
    setSuccess("");
  };

  const validateForm = () => {
    const { name, image, minDeposit, duration, expectedReturn } = planData;

    if (!name || !image || !minDeposit || !duration || !expectedReturn) {
      return "All fields are required.";
    }

    if (minDeposit <= 0 || duration <= 0 || expectedReturn <= 0) {
      return "Please enter valid positive values for deposit, duration, and return.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      await createInvestmentPlan(planData);
      setSuccess("Plan added successfully!");
      setPlanData({
        name: "",
        image: "",
        type: "crypto",
        minDeposit: "",
        duration: "",
        expectedReturn: "",
      });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "An error occurred while adding the plan.");
    } finally {
      setLoading(false);
    }
  };

  const renderInputField = ({ label, name, type, placeholder }) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-300 font-semibold mb-2">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={planData[name]}
        onChange={handleInputChange}
        className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder={placeholder}
        required
      />
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-green-400">Add Plan</h2>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {success && <div className="text-green-500 text-center mb-4">{success}</div>}

      <form onSubmit={handleSubmit}>
        {renderInputField({
          label: "Plan Name",
          name: "name",
          type: "text",
          placeholder: "Enter plan name",
        })}
        {renderInputField({
          label: "Plan Image Link",
          name: "image",
          type: "text",
          placeholder: "Enter image URL",
        })}
        {renderInputField({
          label: "Minimum Deposit",
          name: "minDeposit",
          type: "number",
          placeholder: "Enter minimum deposit",
        })}
        {renderInputField({
          label: "Duration (in days)",
          name: "duration",
          type: "number",
          placeholder: "Enter duration",
        })}
        {renderInputField({
          label: "Expected Return (%)",
          name: "expectedReturn",
          type: "number",
          placeholder: "Enter expected return",
        })}

        <div className="mb-4">
          <label htmlFor="type" className="block text-gray-300 font-semibold mb-2">
            Plan Type
          </label>
          <select
            id="type"
            name="type"
            value={planData.type}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="crypto">Crypto</option>
            <option value="stock">Commodities</option>
            <option value="forex">ETF</option>
          </select>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className={`py-2 px-6 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-green-500 ${
              loading
                ? "bg-gray-500 cursor-not-allowed text-gray-300"
                : "bg-green-500 hover:bg-green-400 text-black"
            }`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Plan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPlan;
