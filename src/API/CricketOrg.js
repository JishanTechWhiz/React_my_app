import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CricketData.css'; // Importing CSS file for styles

const CricketData = () => {
  const [matches, setMatches] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(''); // State for the selected team
  const [teams, setTeams] = useState([]); // Store unique teams
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [matchesPerPage] = useState(6); // Number of matches to display per page

  const apiKey = process.env.REACT_APP_CRICKET_API_KEY;

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(`https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`);
        const matchData = response.data.data || [];
        setMatches(matchData);

        // Extract teams and remove duplicates using Set
        const uniqueTeams = new Set();
        matchData.forEach((match) => {
          match.teams.forEach((team) => uniqueTeams.add(team));
        });
        setTeams([...uniqueTeams]); // Convert Set back to array and set it to state
      } catch (error) {
        console.error("Error fetching cricket data", error);
      }
    };

    fetchMatches();
  }, [apiKey]);

  // Handle team selection
  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
    setCurrentPage(1); // Reset to first page when team is changed
  };

  // Filter matches based on selected team
  const filteredMatches = selectedTeam
    ? matches.filter((match) => match.teams.includes(selectedTeam))
    : matches; // Show all matches if no team is selected

  // Pagination logic
  const indexOfLastMatch = currentPage * matchesPerPage;
  const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
  const currentMatches = filteredMatches.slice(indexOfFirstMatch, indexOfLastMatch);

  // Change page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredMatches.length / matchesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="cricket-data-container">
      <h1>Current Cricket Matches</h1>
      
      {/* Dropdown for selecting team */}
      <div className="team-select">
        <label htmlFor="team">Select Team: </label>
        <select id="team" value={selectedTeam} onChange={handleTeamChange}>
          <option value="">All Teams</option>
          {teams.map((team, index) => (
            <option key={index} value={team}>
              {team}
            </option>
          ))}
        </select>
      </div>

      {currentMatches.length > 0 ? (
        <div className="matches-list">
          {currentMatches.map((match) => (
            <div className="match-card" key={match.id}>
              <h2>{match.name}</h2>
              <p><strong>Match Type:</strong> {match.matchType.toUpperCase()}</p>
              <p><strong>Venue:</strong> {match.venue}</p>
              <p><strong>Date:</strong> {new Date(match.dateTimeGMT).toLocaleString()}</p>
              <p className="status"><strong>Status:</strong> {match.status}</p>
              <h3>Scores:</h3>
              {match.score.map((inning, index) => (
                <div key={index} className="inning-score">
                  <p><strong>{inning.inning}</strong>: {inning.r} runs, {inning.w} wickets in {inning.o} overs</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>No matches found for the selected team.</p>
      )}

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button className="prev-btn" onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span className="page-info">Page {currentPage} of {Math.ceil(filteredMatches.length / matchesPerPage)}</span>
        <button className="next-btn" onClick={nextPage} disabled={currentPage === Math.ceil(filteredMatches.length / matchesPerPage)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CricketData;
