import React, { useState, useEffect } from 'react';
import { Utensils, AlertCircle } from 'lucide-react';
import ComplaintCard from '../components/ComplaintCard';

const MessDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComplaints = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/complaint/mess", {
        method: "GET",
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error('Failed to fetch complaints');
      }

      const result = await response.json();
      setComplaints(result.data || []);
    } catch (err) {
      console.error("Error fetching mess complaints:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleStatusChange = async (complaintId, newStatus) => {
    try {
      const response = await fetch('http://localhost:3000/complaint/changeStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ complaintId, status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Refresh complaints or update locally
      setComplaints(prev => 
        prev.map(c => 
          (c._id === complaintId || c.id === complaintId) ? { ...c, status: newStatus } : c
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert('Failed to update complaint status.');
    }
  };

  return (
    <div className="min-h-screen bg-orange-50/30 pt-8 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        
        <header className="mb-2 flex items-center gap-4 border-b border-orange-200 pb-6">
          <div className="p-4 bg-orange-100 rounded-2xl">
            <Utensils className="w-8 h-8 text-orange-600" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Mess Department Dashboard
            </h1>
            <p className="text-gray-500 mt-2 text-lg">
              Manage and update statuses for mess-related complaints.
            </p>
          </div>
        </header>

        <section>
          {loading ? (
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((skeleton) => (
                <div key={skeleton} className="bg-white rounded-xl h-32 animate-pulse border border-gray-100 p-6">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-100 rounded w-1/2 mb-4"></div>
                  <div className="h-8 bg-gray-100 rounded-full w-32"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-700 p-6 rounded-xl flex items-center gap-3 border border-red-100">
              <AlertCircle className="w-6 h-6" />
              <p className="font-medium">Error: {error}</p>
            </div>
          ) : complaints.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-xl border border-gray-200 shadow-sm">
              <Utensils className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium">No complaints found for the Mess department.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {complaints.map(complaint => (
                <ComplaintCard 
                  key={complaint._id || complaint.id} 
                  complaint={complaint} 
                  onStatusChange={handleStatusChange} 
                />
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default MessDashboard;
