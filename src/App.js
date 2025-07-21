// src/App.js
import React, { useState, useEffect } from "react";
import Select from "react-select";
import data from "./data.json";
import JobCard from "./components/JobCard";
import "./App.css";

function App() {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedTools, setSelectedTools] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);

  const languages = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "CSS", label: "CSS" },
    { value: "HTML", label: "HTML" },
    { value: "Ruby", label: "Ruby" },
    { value: "Python", label: "Python" },
  ];

  const tools = [
    { value: "React", label: "React" },
    { value: "Sass", label: "Sass" },
    { value: "Vue", label: "Vue" },
    { value: "Django", label: "Django" },
    { value: "RoR", label: "RoR" },
  ];

  const roles = [
    { value: "Frontend", label: "Frontend" },
    { value: "Backend", label: "Backend" },
    { value: "Fullstack", label: "Fullstack" },
  ];

  const levels = [
    { value: "Junior", label: "Junior" },
    { value: "Midweight", label: "Midweight" },
    { value: "Senior", label: "Senior" },
  ];

  // Initial load
  useEffect(() => {
    setListings(data);
    setFilteredListings(data);
  }, []);

  // Refilter on any change
  useEffect(() => {
    filterListing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLanguages, selectedTools, selectedRole, selectedLevel]);

  const filterListing = () => {
    // No filters → show all
    if (
      selectedLanguages.length === 0 &&
      selectedTools.length === 0 &&
      !selectedRole &&
      !selectedLevel
    ) {
      setFilteredListings(listings);
      return;
    }

    const filtered = listings.filter((job) => {
      const languageMatch =
        selectedLanguages.length === 0 ||
        selectedLanguages.every((j) => job.languages.includes(j.value));

      const toolMatch =
        selectedTools.length === 0 ||
        selectedTools.every((t) => job.tools.includes(t.value));

      const roleMatch = !selectedRole || selectedRole.value === job.role;
      const levelMatch = !selectedLevel || selectedLevel.value === job.level;

      return languageMatch && toolMatch && roleMatch && levelMatch;
    });

    setFilteredListings(filtered);
  };

  const clearAll = () => {
    setSelectedLanguages([]);
    setSelectedTools([]);
    setSelectedRole(null);
    setSelectedLevel(null);
  };

  return (
    <div className="App">
      <div className="select-container">
        <button className="clear-button" onClick={clearAll}>
          Clear All Filters
        </button>

        <Select
          placeholder="Select Languages"
          options={languages}
          isMulti
          value={selectedLanguages}
          onChange={(opts) => setSelectedLanguages(opts || [])}
        />

        <Select
          placeholder="Select Tools"
          options={tools}
          isMulti
          value={selectedTools}
          onChange={(opts) => setSelectedTools(opts || [])}
        />

        <Select
          placeholder="Select Role"
          options={roles}
          isClearable
          value={selectedRole}
          onChange={(opt) => setSelectedRole(opt)}
        />

        <Select
          placeholder="Select Level"
          options={levels}
          isClearable
          value={selectedLevel}
          onChange={(opt) => setSelectedLevel(opt)}
        />
      </div>

      <div className="list-area">
        {filteredListings.length > 0 ? (
          filteredListings.map((job) => <JobCard key={job.id} listing={job} />)
        ) : selectedLanguages.length === 0 &&
          selectedTools.length === 0 &&
          !selectedRole &&
          !selectedLevel ? (
          // Should never hit this branch because it’s handled above,
          // but just in case…
          listings.map((job) => <JobCard key={job.id} listing={job} />)
        ) : (
          <p className="no-results">
            No jobs match your criteria. Try adjusting your filters.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
