import React, { useState } from 'react';
import { Send } from 'lucide-react';

const SubmitComplaintBar = ({ onSubmit }) => {
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim() || !department) return;

    onSubmit({
      description,
      department,
      date: new Date().toISOString(),
      status: 'Pending',
    });

    // Reset form after submission
    setDescription('');
    setDepartment('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-10 transition-shadow hover:shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Submit a Complaint</h2>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-start">
        <div className="flex-1 w-full">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your issue in detail..."
            className="w-full h-14 md:h-16 px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 resize-none outline-none transition-all placeholder:text-gray-400"
            required
            rows={1}
            style={{ minHeight: '64px' }}
          />
        </div>
        
        <div className="w-full md:w-64 shrink-0">
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full h-14 md:h-16 px-4 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all bg-white text-gray-700 appearance-none cursor-pointer"
            required
          >
            <option value="" disabled>Select Department</option>
            <option value="Mess">Mess Department</option>
            <option value="Hostel">Hostel Department</option>
            <option value="Security">Security Department</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={!description.trim() || !department}
          className="w-full md:w-auto h-14 md:h-16 px-8 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <span>Submit</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default SubmitComplaintBar;
