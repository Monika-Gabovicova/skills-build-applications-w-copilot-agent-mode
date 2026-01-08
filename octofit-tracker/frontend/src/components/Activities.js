import React, { useState, useEffect } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
      const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/activities/`;
      console.log('Fetching from:', apiUrl);

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched activities data:', data);
        // Handle both paginated and plain array responses
        const activitiesData = data.results || data;
        setActivities(activitiesData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching activities:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="mb-4">Activities</h2>
      {activities.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              {Object.keys(activities[0]).map(key => <th key={key}>{key}</th>)}
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={index}>
                {Object.values(activity).map((value, i) => <td key={i}>{typeof value === 'object' ? JSON.stringify(value) : value}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No activities found.</p>
      )}
    </div>
  );
};

export default Activities;