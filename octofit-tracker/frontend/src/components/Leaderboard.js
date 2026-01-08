import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
      const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`;
      console.log('Fetching from:', apiUrl);

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched leaderboard data:', data);
        // Handle both paginated and plain array responses
        const leaderboardData = data.results || data;
        setLeaderboard(leaderboardData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching leaderboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="mb-4">Leaderboard</h2>
      {leaderboard.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              {Object.keys(leaderboard[0]).map(key => <th key={key}>{key}</th>)}
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={index}>
                {Object.values(entry).map((value, i) => <td key={i}>{typeof value === 'object' ? JSON.stringify(value) : value}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No leaderboard data found.</p>
      )}
    </div>
  );
};

export default Leaderboard;