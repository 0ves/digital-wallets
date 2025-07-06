import React, { useState, useEffect } from 'react';
import apiClient from '../api/api'; // Import your API helper

function ProfileUpdate() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Example: Fetch existing profile data when component mounts (authenticated GET request)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // apiClient will automatically add the Authorization header
        const response = await apiClient.get('/user/me'); // Assuming you have a /user/me endpoint
        setFirstname(response.data.firstname);
        setLastname(response.data.lastname);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to load profile data.');
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      // apiClient will automatically add the Authorization header
      const response = await apiClient.put('/user/', { // Your update endpoint
        firstname, // Using shorthand for firstname: firstname
        lastname,
      });

      setMessage(response.data.msg || 'Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.response?.data?.msg || 'Failed to update profile.');
    }
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            id="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default ProfileUpdate;