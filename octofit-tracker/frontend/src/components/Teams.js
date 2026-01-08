import React, { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
      const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/teams/`;
      console.log('Fetching from:', apiUrl);

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched teams data:', data);
        // Handle both paginated and plain array responses
        const teamsData = data.results || data;
        setTeams(teamsData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching teams:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="mb-4">Teams</h2>
      {teams.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              {Object.keys(teams[0]).map(key => <th key={key}>{key}</th>)}
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr key={index}>
                {Object.values(team).map((value, i) => <td key={i}>{typeof value === 'object' ? JSON.stringify(value) : value}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No teams found.</p>
      )}
    </div>
  );
};

export default Teams;