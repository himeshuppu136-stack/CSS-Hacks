import React from 'react';

const StatusBadge = ({ status }) => {
  // Convert status to Title Case (e.g., 'pending' -> 'Pending', 'in progress' -> 'In Progress')
  const formattedStatus = (status || 'Pending')
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  let bgColor = '';
  let textColor = '';

  switch (formattedStatus) {
    case 'Pending':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-800';
      break;
    case 'In Progress':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      break;
    case 'Resolved':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      break;
    default:
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-800';
  }

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      {formattedStatus}
    </span>
  );
};

export default StatusBadge;
