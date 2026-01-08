import React, { useState, useEffect } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
      const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/workouts/`;
      console.log('Fetching from:', apiUrl);

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched workouts data:', data);
        // Handle both paginated and plain array responses
        const workoutsData = data.results || data;
        setWorkouts(workoutsData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching workouts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="mb-4">Workouts</h2>
      {workouts.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              {Object.keys(workouts[0]).map(key => <th key={key}>{key}</th>)}
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout, index) => (
              <tr key={index}>
                {Object.values(workout).map((value, i) => <td key={i}>{typeof value === 'object' ? JSON.stringify(value) : value}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No workouts found.</p>
      )}
    </div>
  );
};

export default Workouts;