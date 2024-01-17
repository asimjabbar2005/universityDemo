import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UniversityDataService from "../services/UniversityService";

const UpdateUniversity = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialUniversityState = {
    id: null,
    domains: [],
    name: "",
    alpha_two_code: "",
    web_pages: [],
    state_province: "",
    country: "",
  };
  const [currentUniversity, setCurrentUniversity] = useState(
    initialUniversityState
  );
  const [message, setMessage] = useState("");

  const getUniversity = (id) => {
    UniversityDataService.get(id)
      .then((response) => {
        setCurrentUniversity(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) getUniversity(id);
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentUniversity({ ...currentUniversity, [name]: value });
  };

  const handleWebsiteChange = (event) => {
    const { name, value } = event.target;

    setCurrentUniversity((prevState) => ({
      ...prevState,
      web_pages: [...prevState.web_pages, value],
    }));
  };

  const handleDomainChange = (event) => {
    const { name, value } = event.target;
    setCurrentUniversity((prevState) => ({
      ...prevState,
      domains: [...prevState.domains, value],
    }));
  };

  const updateUniversity = () => {
    UniversityDataService.update(currentUniversity.id, currentUniversity)
      .then((response) => {
        console.log(response.data);
        setMessage("The university was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentUniversity ? (
        <div className="edit-form">
          <h4>University</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={currentUniversity.name}
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
                value={currentUniversity.country}
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
                value={currentUniversity.countryCode}
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
                value={currentUniversity.website}
                onChange={handleWebsiteChange}
                name="web_pages"
              />
            </div>
          </form>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateUniversity}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please select a University</p>
        </div>
      )}
    </div>
  );
};

export default UpdateUniversity;
