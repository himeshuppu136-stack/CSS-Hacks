import React, { useState, useEffect } from 'react';
import SubmitComplaintBar from '../components/SubmitComplaintBar';
import DepartmentCard from '../components/DepartmentCard';
import { Shield, Utensils, Home as HomeIcon, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- MOCK DATA ---
// const initialMockData = {
//   Mess: [
//     { id: 1, description: 'Food quality has been poor for the last three days.', date: '2026-04-14T10:00:00Z', status: 'Pending' },
//     { id: 2, description: 'Water cooler near block B mess is not working.', date: '2026-04-12T14:30:00Z', status: 'In Progress' },
//     { id: 3, description: 'Dinner was served very late yesterday.', date: '2026-04-10T09:15:00Z', status: 'Resolved' },
//   ],
//   Hostel: [
//     { id: 4, description: 'AC in Room 402 is making loud noises.', date: '2026-04-15T08:00:00Z', status: 'Pending' },
//     { id: 5, description: 'Wi-Fi keeps disconnecting on the 2nd floor.', date: '2026-04-13T16:45:00Z', status: 'In Progress' },
//   ],
//   Security: [
//     { id: 6, description: 'Main gate entry log is missing some entries.', date: '2026-04-14T20:20:00Z', status: 'Resolved' },
//     { id: 7, description: 'Street light near the back gate is broken.', date: '2026-04-11T19:00:00Z', status: 'In Progress' },
//   ]
// };

const Home = () => {
  const [complaints, setComplaints] = useState({
    Mess: [],
    Hostel: [],
    Security: []
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // FETCH DATA ON MOUNT
  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/complaint/fetchComplaint", {
            method: "GET",
            credentials: "include"
        });

        const result = await response.json();
      setTimeout(() => {
        setComplaints(result.data);
        setLoading(false);
      }, 800); 
    }
    catch(err){
      console.log("error in fetch past complaints")
    }
    };

    fetchComplaints();
  }, []);

  // HANDLE POST REQUEST
  const handleSubmitComplaint = async (newComplaintData) => {
    // TODO: Replace this block with your actual Axios/Fetch POST request
    // Example:
    // const res = await axios.post('/api/complaints', newComplaintData);
    // const savedComplaint = res.data;
    
    console.log('Submitting data to backend:', newComplaintData);
    try {
      const response = await fetch('http://localhost:3000/complaint/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(newComplaintData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit complaint');
      }

      alert('Complaint successfully submitted!');
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert('Error submitting complaint!');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3000/student/logout', { method: 'POST', credentials: 'include' });
      navigate('/login');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pt-8 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        
        {/* Header Section */}
        <header className="mb-2 flex justify-between items-start">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Campus Platform
            </h1>
            <p className="text-gray-500 mt-2 text-lg">
              Manage and track campus complaints across departments.
            </p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg shadow-sm transition-colors font-medium"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </header>

        {/* Top Section: Submit Bar */}
        <section>
          <SubmitComplaintBar onSubmit={handleSubmitComplaint} />
        </section>

        {/* Bottom Section: Department Dashboards */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Department Dashboards</h2>
            <div className="h-px bg-gray-200 flex-1 ml-4 hidden sm:block"></div>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[1, 2, 3].map((skeleton) => (
                <div key={skeleton} className="bg-white rounded-xl h-80 animate-pulse border border-gray-100 p-6 flex flex-col gap-4">
                  <div className="h-6 w-32 bg-gray-200 rounded"></div>
                  <div className="flex-1 flex flex-col gap-3 mt-4">
                    <div className="h-4 bg-gray-100 rounded w-full"></div>
                    <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-100 rounded w-full mt-4"></div>
                    <div className="h-4 bg-gray-100 rounded w-4/6"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <DepartmentCard 
                departmentName={
                  <div className="flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-orange-500" /> Mess Department
                  </div>
                } 
                complaints={complaints.Mess} 
              />
              <DepartmentCard 
                departmentName={
                  <div className="flex items-center gap-2">
                    <HomeIcon className="w-5 h-5 text-blue-500" /> Hostel Department
                  </div>
                } 
                complaints={complaints.Hostel} 
              />
              <DepartmentCard 
                departmentName={
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-500" /> Security Department
                  </div>
                } 
                complaints={complaints.Security} 
              />
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default Home;
