import axios from "axios";
import { useEffect, useState } from "react";
import { FcBrokenLink } from "react-icons/fc";
import { getSavedJobs, host } from "../../../../utils/APIRoutes";
import {
  ColoredSlogan,
  Slogan,
} from "../../Home/SeekerHero/seekerHeroElements";
import {
  ApplyButton,
  CompanyInfoHoler,
  ContentHolder,
  JobCard,
  JobCardsHoler,
  JobDescription,
  JobDescriptionBox,
  JobFooter,
  JobTitle,
  JobTitleHolder,
  JobType,
  Muted,
  Salary,
  TitleHolder,
} from "./JobElements";

import { Link } from "react-router-dom";
import Tilt from "react-tilt";

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [ready, setIsReady] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios.get(getSavedJobs, config).then((result) => {
      console.log(result);
      setSavedJobs(result.data.savedJobs);
      setIsReady(true);
    });
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      <ContentHolder>
        <TitleHolder>
          <Slogan>Saved Jobs</Slogan>
        </TitleHolder>

        <JobCardsHoler>
          {ready ? (
            savedJobs.length != 0 ? (
              savedJobs.map((job) => (
                <JobCard
                  onClick={(event) =>
                    (window.location.href = `/applicant/job/${job.job._id}`)
                  }
                >
                  <div style={{ zIndex: 1 }}>
                    <CompanyInfoHoler>
                      <div className="box1">
                        <img
                          src={host + "/" + job?.job?.company?.avatarImage}
                          alt="ss"
                        />
                      </div>
                      <div className="box2">
                        <h6>{job.job.company.name}</h6>
                        <p>
                          {job.job.company.region}, {job.job.company.country}
                        </p>
                      </div>
                    </CompanyInfoHoler>
                    <JobTitleHolder>
                      <JobTitle>{job.job.title}</JobTitle>
                      <JobType>Full Time</JobType>
                    </JobTitleHolder>
                    <JobDescriptionBox>
                      <JobDescription>{job.job.description}</JobDescription>
                    </JobDescriptionBox>
                    <JobFooter>
                      <Salary>
                        ${job.job.salary}
                        <Muted>/month</Muted>
                      </Salary>
                      {/* <ApplyButton>Status = {job.status} </ApplyButton> */}
                    </JobFooter>
                  </div>
                </JobCard>
              ))
            ) : (
              <div style={{ width: "40%", margin: "auto" }}>
                <Tilt
                  options={{
                    scale: 1,
                  }}
                >
                  <div
                    data-tilt
                    data-tilt-glare
                    data-tilt-max-glare="0.3"
                    className="cardEmpty"
                  >
                    <h2 class="name">No Saved Jobs Found</h2>
                    <p style={{ color: "black", textAlign: "center" }}>
                      {" "}
                      Explore Available Jobs
                    </p>
                    <div style={{ margin: "auto" }}>
                      <Link to="/applicant/jobs">
                        <button
                          style={{
                            backgroundColor: "white",
                            color: "black",
                            padding: "0.5rem",
                            borderRadius: "1rem",
                          }}
                        >
                          Explore Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </Tilt>
              </div>
            )
          ) : (
            <div style={{ margin: "auto" }}>
              <div className="loading-wrapper">
                <div className="loader">
                  <div className="loading-circle">s</div>
                </div>
              </div>
            </div>
          )}
        </JobCardsHoler>
      </ContentHolder>
    </div>
  );
}

export default SavedJobs;

// const get_function = async () => {
// const token = await JSON.parse(localStorage.getItem("token"));
// const config = {
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   },
// };

//   axios
//     .get(getSavedJobs, config)
//     .then((result) => {
//       setsavedJobs(result.data.savedJobs);
//       setIsReady(true);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
