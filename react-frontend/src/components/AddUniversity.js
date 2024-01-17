import React, { useState } from "react";
import UniversityDataService from "../services/UniversityService";

const AddUniversity = () => {
  const initialUniversityState = {
    id: null,
    domains: [],
    name: "",
    alpha_two_code: "",
    web_pages: [],
    state_province: "",
    country: "",
  };

  const [university, setUniversity] = useState(initialUniversityState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUniversity({ ...university, [name]: value });
  };

  const handleWebsiteChange = (event) => {
    const { name, value } = event.target;

    setUniversity((prevState) => ({
      ...prevState,
      web_pages: [...prevState.web_pages, value],
    }));
  };

  const handleDomainChange = (event) => {
    const { name, value } = event.target;
    setUniversity((prevState) => ({
      ...prevState,
      domains: [...prevState.domains, value],
    }));
  };

  const saveUniversity = () => {
    var data = university;

    UniversityDataService.create(data)
      .then((response) => {
        setUniversity({
          id: response.data.id,
          name: response.data.title,
          countryCode: response.data.alpha_two_code,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newUniversity = () => {
    setUniversity(initialUniversityState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Form submitted successfully!</h4>
          <button className="btn btn-success" onClick={newUniversity}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={university.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              className="form-control"
              id="country"
              required
              value={university.country}
              onChange={handleInputChange}
              name="country"
            />
          </div>

          <div className="form-group">
            <label htmlFor="countryCode">Country code</label>
            <input
              type="text"
              className="form-control"
              id="alpha_two_code"
              required
              value={university.countryCode}
              onChange={handleInputChange}
              name="alpha_two_code"
            />
          </div>

          <div className="form-group">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              className="form-control"
              id="web_pages"
              required
              value={university.website}
              onChange={handleWebsiteChange}
              name="web_pages"
            />
          </div>

          <button onClick={saveUniversity} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddUniversity;
