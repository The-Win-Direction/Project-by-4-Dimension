import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../../config';

const AddEconomicLog = ({ khetId }) => {
  const [formData, setFormData] = useState({
    costType: '',
    amount: '',
    description: '',
    yield: '',
    salePrice: '',
    buyerMarket: '',
    profitOrLoss: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const token = localStorage.getItem('token');

    try {
      await axios.post(`${BACKEND_BASE_URL}/api/khets/${khetId}/economic-log`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setSuccess(true);
      setFormData({
        costType: '',
        amount: '',
        description: '',
        yield: '',
        salePrice: '',
        buyerMarket: '',
        profitOrLoss: '',
      });
    } catch (err) {
      console.error(err);
      setError('Failed to submit economic log');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <input type="text" name="costType" placeholder="Cost Type" value={formData.costType} onChange={handleChange} className="border p-2 rounded w-full" required />
      <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} className="border p-2 rounded w-full" required />
      <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-2 rounded w-full" />
      <input type="text" name="yield" placeholder="Yield (e.g. 200 kg)" value={formData.yield} onChange={handleChange} className="border p-2 rounded w-full" />
      <input type="number" name="salePrice" placeholder="Sale Price per unit" value={formData.salePrice} onChange={handleChange} className="border p-2 rounded w-full" />
      <input type="text" name="buyerMarket" placeholder="Buyer or Market" value={formData.buyerMarket} onChange={handleChange} className="border p-2 rounded w-full" />
      <input type="text" name="profitOrLoss" placeholder="Profit or Loss Summary" value={formData.profitOrLoss} onChange={handleChange} className="border p-2 rounded w-full" />
      <button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
        {loading ? 'Submitting...' : 'Submit Economic Log'}
      </button>
      {success && <p className="text-green-600">Log submitted successfully!</p>}
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
};

export default AddEconomicLog;
