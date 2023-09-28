import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { getSavedJobs, unsaveJob, host } from "../../../../utils/APIRoutes";
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
  UnsaveButton,
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

  // // Function to handle unsaving a job
  // const handleUnsaveJob = (jobId) => {
  //   const unsaveJob = async () => {
  //     try {
  //       const token = JSON.parse(localStorage.getItem("token"));
  //       console.log("Token:",token);
  //       const config = {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       };
  //       const response = await axios.post(unsaveJob, null, config);

  //       if (response.data.success) {
  //         // Job was successfully unsaved
  //         // You can also update the UI to remove the unsaved job from the list
  //         const updatedSavedJobs = savedJobs.filter(
  //           (job) => job.job._id !== jobId
  //         );
  //         setSavedJobs(updatedSavedJobs);
  //       } else {
  //         // Handle error if the job couldn't be unsaved
  //         console.error("Failed to unsave job:", response.data.msg);
  //       }
  //     } catch (error) {
  //       console.error("Error while unsaving job:", error);
  //     }
  //   };
  //   // Confirm with the user before unsaving the job
  //   if (window.confirm("Are you sure you want to unsave this job?")) {
  //     unsaveJob();
  //   }
  // };

  return (
    <div style={{ minHeight: "100vh" }}>
      <ContentHolder>
        <TitleHolder>
          <Slogan>Saved Jobs</Slogan>
        </TitleHolder>

        <JobCardsHoler>
          {ready ? (
            savedJobs.length !== 0 ? (
              savedJobs.map((job) => (
                <JobCard
                  onClick={(event) =>
                    (window.location.href = `/applicant/job/${job?.job?._id}`)
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
                        <h6>{job?.job?.company?.name}</h6>
                        <p>
                          {job?.job?.company?.region},{" "}
                          {job?.job?.company?.country}
                        </p>
                      </div>
                    </CompanyInfoHoler>
                    <JobTitleHolder>
                      <JobTitle>{job?.job?.title}</JobTitle>
                      <JobType>Full Time</JobType>
                    </JobTitleHolder>
                    <JobDescriptionBox>
                      <JobDescription>{job?.job?.description}</JobDescription>
                    </JobDescriptionBox>
                    <JobFooter>
                      <Salary>
                        ${job?.job?.salary}
                        <Muted>/month</Muted>
                      </Salary>
                      {/* <UnsaveButton
                        onClick={() => handleUnsaveJob(job.job._id)}
                      >
                        Unsave
                      </UnsaveButton> */}
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
