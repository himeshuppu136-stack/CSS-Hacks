import React from 'react';
import StatusBadge from './StatusBadge';
import { Calendar } from 'lucide-react';

const DepartmentCard = ({ departmentName, complaints }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-300">
      <div className="bg-gray-50 border-b border-gray-100 px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-800">{departmentName}</h3>
      </div>
      <div className="p-0 flex-1">
        {complaints && complaints.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {complaints.map((complaint) => (
              <li key={complaint._id || complaint.id} className="p-6 hover:bg-gray-50/50 transition-colors">
                <div className="flex justify-between items-start mb-2 gap-4">
                  <p className="text-gray-800 font-medium line-clamp-2 leading-snug flex-1">
                    {complaint.complaint || complaint.description}
                  </p>
                  <StatusBadge status={complaint.status || 'Pending'} />
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-3">
                  <Calendar className="w-4 h-4 mr-1.5 opacity-70" />
                  <span>{new Date(complaint.createdAt || complaint.date || new Date()).toLocaleDateString()}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-8 text-center text-gray-400">
            <p>No recent complaints found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentCard;
