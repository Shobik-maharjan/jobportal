import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllJobs, host } from "../../../../utils/APIRoutes";
import { ColoredSlogan, Slogan } from "../SeekerHero/seekerHeroElements";
import {
  ApplyButton,
  CompanyInfoHoler,
  ContentHolder,
  JobCard,
  JobCardsHoler,
  JobDescription,
  JobDescriptionBox,
  JobFooter,
  JobsContainer,
  JobTitle,
  JobTitleHolder,
  JobType,
  Muted,
  Salary,
  TitleHolder,
} from "./JobElements";
import "./style.css";

function SeekerJob() {
  var [ready, setIsReady] = useState(false);
  var [jobs, setJobs] = useState([]);
  useEffect(() => {
    axios.get(getAllJobs).then((result) => {
      jobs = result.data.data;
      setJobs(jobs);
      console.log(jobs);
      setIsReady(true);
    });
  }, []);
  return (
    <JobsContainer>
      {/* <ParticleBackground /> */}
      <ContentHolder>
        <TitleHolder>
          <Slogan>
            <ColoredSlogan>Featured</ColoredSlogan> Job Circulators
          </Slogan>
        </TitleHolder>
        <JobCardsHoler>
          {ready ? (
            jobs.map((job) => (
              <JobCard
              // onClick={(event) =>
              //   (window.location.href = )
              // }
              >
                <div style={{ zIndex: 1 }}>
                  <Link to={`/applicant/job/${job._id}`}>
                    <CompanyInfoHoler>
                      <div className="box1">
                        <img
                          src={host + "/" + job.company.avatarImage}
                          alt="ss"
                        />
                      </div>
                      <div className="box2">
                        <h6>{job.company.name}</h6>
                        <p>
                          {job.company.region}, {job.company.country}
                        </p>
                      </div>
                    </CompanyInfoHoler>
                    <JobTitleHolder>
                      <JobTitle>{job.title}</JobTitle>
                      <JobType>Full Time</JobType>
                    </JobTitleHolder>
                    <JobDescriptionBox>
                      <JobDescription>{job.description}</JobDescription>
                    </JobDescriptionBox>
                    <JobFooter>
                      <Salary>
                        Rs.{job.salary}
                        <Muted>/month</Muted>
                      </Salary>
                      <ApplyButton>Apply Now</ApplyButton>
                    </JobFooter>
                  </Link>
                </div>
              </JobCard>
            ))
          ) : (
            <div>Hello</div>
          )}
        </JobCardsHoler>
      </ContentHolder>
    </JobsContainer>
  );
}

export default SeekerJob;
