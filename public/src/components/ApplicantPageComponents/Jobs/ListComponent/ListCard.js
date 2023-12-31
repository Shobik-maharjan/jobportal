import { host } from "../../../../utils/APIRoutes";
import { Link } from "react-router-dom";
import {
  ApplyButton,
  CompanyInfoHoler,
  JobCard,
  JobDescription,
  JobDescriptionBox,
  JobFooter,
  JobTitle,
  JobTitleHolder,
  JobType,
  Muted,
  Salary,
} from "./listElements";

function Job(item) {
  item = item.item;
  // console.log(item.company.avatarImage);
  return (
    <JobCard id={item._id}>
      <div style={{ zIndex: 1 }}>
        <Link to={`/applicant/job/${item._id}`}>
          <CompanyInfoHoler>
            <div className="box1">
              <img src={host + "/" + item.company.avatarImage} alt="ss" />
            </div>
            <div className="box2">
              <h6>{item.company.name}</h6>
              <p>
                {item.company.region}, {item.company.country}
              </p>
            </div>
          </CompanyInfoHoler>
          <JobTitleHolder>
            <JobTitle>{item.title}</JobTitle>
            <JobType>{item.type}</JobType>
          </JobTitleHolder>
          <JobDescriptionBox>
            <JobDescription>{item.description}</JobDescription>
          </JobDescriptionBox>
          <JobFooter>
            <Salary>
              Rs.{item.salary}
              <Muted>/month</Muted>
            </Salary>
            <ApplyButton>Apply Now</ApplyButton>
          </JobFooter>
        </Link>
      </div>
    </JobCard>
  );
}

export default Job;
