import React, { useState } from 'react';
import { Calendar, User } from 'lucide-react';

const ComplaintCard = ({ complaint, onStatusChange }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(complaint.status || 'pending');

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setLoading(true);
    await onStatusChange(complaint._id || complaint.id, newStatus);
    setLoading(false);
  };

  const getStatusColor = (currentStatus) => {
    switch (currentStatus.toLowerCase()) {
      case 'solved':
      case 'resolved':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'in progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start gap-4">
        <p className="text-gray-800 font-medium leading-relaxed flex-1">
          {complaint.complaint || complaint.description}
        </p>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4 opacity-70" />
          <span>{new Date(complaint.createdAt || complaint.date || new Date()).toLocaleDateString()}</span>
        </div>
        {complaint.student && (
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4 opacity-70" />
            <span>Student ID: {complaint.student}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintCard;
