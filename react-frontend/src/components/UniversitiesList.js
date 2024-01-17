import React, { useState, useEffect } from "react";
import UniversityDataService from "../services/UniversityService";
import { Link } from "react-router-dom";
import "./University.css";

const UniversitiesList = () => {
  const [universities, setUniversities] = useState([]);
  const [currentUniversity, setCurrentUniversity] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchCountry, setSearchCountry] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    getUniversities();
  }, []);

  const onChangeSearchCountry = (e) => {
    const searchCountry = e.target.value;
    setSearchCountry(searchCountry);
  };

  const getUniversities = () => {
    UniversityDataService.getAll()
      .then((response) => {
        setUniversities(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    getUniversities();
    setCurrentUniversity(null);
    setCurrentIndex(-1);
  };

  const setActiveUniversity = (university, index) => {
    setCurrentUniversity(university);
    setCurrentIndex(index);
  };

  const findByCountry = () => {
    UniversityDataService.searchByCountry(searchCountry)
      .then((response) => {
        setUniversities(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleToggle = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by country"
            value={searchCountry}
            onChange={onChangeSearchCountry}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByCountry}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Universities List</h4>

        <ul className="list-group">
          {universities && (
            <div className="accordion">
              {universities.map((university, index) => (
                <div
                  key={index}
                  className={`accordion-item ${
                    index === activeIndex ? "active" : ""
                  }`}
                >
                  <div className="accordion-title">
                    <span
                      class="toggle-sign"
                      onClick={() => handleToggle(index)}
                    >
                      {index === activeIndex ? "-" : "+"}
                    </span>{" "}
                    <span
                      style={{ marginLeft: "60px" }}
                      onClick={() => setActiveUniversity(university, index)}
                    >
                      {" "}
                      {university.name}{" "}
                    </span>
                  </div>
                  {index === activeIndex && (
                    <>
                      <div className="accordion-content">
                        Domains: {university.domains}
                      </div>
                      <div className="accordion-content">
                        Country code: {university.alpha_two_code}
                      </div>
                      <div className="accordion-content">
                        Websites: {university.web_pages}
                      </div>
                      <div className="accordion-content">
                        State/Province: {university.state_province}
                      </div>
                      <div className="accordion-content">
                        Country: {university.country}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </ul>
      </div>
      <div className="col-md-6">
        {currentUniversity ? (
          <div>
            <h4>University</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentUniversity.name}
            </div>
            <div>
              <label>
                <strong>Domains:</strong>
              </label>{" "}
              {currentUniversity.domains}
            </div>
            <div>
              <label>
                <strong>Country code:</strong>
              </label>{" "}
              {currentUniversity.alpha_two_code}
            </div>
            <div>
              <label>
                <strong>Websites:</strong>
              </label>{" "}
              {currentUniversity.web_pages}
            </div>
            <div>
              <label>
                <strong>State/Province:</strong>
              </label>{" "}
              {currentUniversity.state_province}
            </div>

            <Link to={"/universities/" + currentUniversity.id}>Edit</Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please select a University</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversitiesList;
