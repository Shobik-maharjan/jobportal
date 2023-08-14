import { Skeleton } from "@mui/material";
import axios from "axios";
import Moment from "moment";
import React, { useEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { MdOutlineMessage } from "react-icons/md";
import { toast } from "react-toastify";
import {
  applyForJob,
  checkAlreadyApplied,
  getSavedJobs,
  saveJob,
} from "../../../utils/APIRoutes";
import {
  ApplyButton,
  ButtonContainer,
  ChatContainer,
  ChatInput,
  DisabledApplyButton,
  MessageButton,
  SaveButton,
  SectionWrapper,
} from "./Component";

function Sidebar({ job, isLoading }) {
  const [dataRecived, setDataRecived] = useState(false);
  const [allow, setAllow] = useState(false);
  const [jobData, setJobData] = useState({});
  const [user, setUser] = useState(null);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    const cu = JSON.parse(localStorage.getItem("user"));
    setUser(cu);
    if (job) {
      axios
        .get(checkAlreadyApplied, {
          params: {
            jobId: job._id,
            userId: cu._id,
          },
        })
        .then((result) => {
          setJobData(result.data.data);
          setAllow(result.data.status);
          setDataRecived(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoading]);

  const handleSaveJob = () => {
    // Send a request to your backend API to save the job for the logged-in user
    const token = JSON.parse(localStorage.getItem("token"));
    console.log("Token:", token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        jobId: job._id,
        userId: user._id,
      },
    };

    axios
      .get(getSavedJobs, config)
      .then((result) => {
        toast.success(result.data.message, toastOptions);
        // console.log(result);
      })
      .catch((err) => {
        toast.error(err.message, toastOptions);
        // console.log(err);
      });
  };

  const handleApply = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(
        applyForJob,
        {
          params: {
            job: job._id,
            user: user._id,
          },
        },
        config
      )
      .then((result) => {
        toast.success(result.data.msg, toastOptions);
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err, toastOptions);
        console.log(err);
      });
  };

  const handleSaveJob = () => {
    // Send a request to your backend API to save the job for the logged-in user
    const token = JSON.parse(localStorage.getItem("token"));
    // console.log("Token:", token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const jobId = job._id;

    axios
      .post(saveJob + `/${jobId}`, {}, config)
      .then((result) => {
        toast.success(result.data.message, toastOptions);
        // console.log(result);
      })
      .catch((err) => {
        toast.error(err.message, toastOptions);
        // console.log(err);
      });
  };

  return (
    <SectionWrapper>
      <ButtonContainer>
        {isLoading ? (
          <Skeleton variant="rectangular">
            <ApplyButton
              to="/applicant/home"
              primary="true"
              dark="true"
            ></ApplyButton>
          </Skeleton>
        ) : dataRecived ? (
          allow ? (
            <ApplyButton
              to="/applicant/home"
              primary="true"
              dark="true"
              onClick={handleApply}
            >
              <AiOutlineCheckCircle /> Apply For This Job
              <div>
                Open ({Moment(job.openDate).format("MMM Do YYYY")}) <div>-</div>
                close ({Moment(job.closeDate).format("MMM Do YYYY")} )
              </div>
            </ApplyButton>
          ) : (
            <div style={{ color: "black" }}>
              <DisabledApplyButton
                primary="true"
                dark="true"
                disabled={true}
                style={{ cursor: "not-allowed" }}
              >
                <AiOutlineCheckCircle /> Already applied for this job
              </DisabledApplyButton>
              <center>
                You have already applied for this job on:
                <b>{Moment(jobData.appliedDate).format("MMM Do YYYY")}</b>
              </center>
            </div>
          )
        ) : (
          <Skeleton variant="rectangular">
            <ApplyButton to="/applicant/home" primary="true" dark="true">
              <AiOutlineCheckCircle /> Apply for this job
            </ApplyButton>
          </Skeleton>
        )}
      </ButtonContainer>

      <ButtonContainer>
        {isLoading ? (
          <Skeleton variant="rectangular">
            <SaveButton
              to="/applicant/home"
              primary="true"
              dark="true"
            ></SaveButton>
          </Skeleton>
        ) : dataRecived ? (
          allow ? (
            <SaveButton
              to="/applicant/home"
              primary="true"
              dark="true"
              onClick={handleSaveJob}
            >
              <AiOutlineCheckCircle /> Save This Job
            </SaveButton>
          ) : (
            <div style={{ color: "black" }}>
              <DisabledApplyButton
                primary="true"
                dark="true"
                disabled={true}
                style={{ cursor: "not-allowed" }}
              >
                <AiOutlineCheckCircle /> Already saved this Job
              </DisabledApplyButton>
              <center>You have already saved for this job</center>
            </div>
          )
        ) : (
          <Skeleton variant="rectangular">
            <SaveButton to="/applicant/home" primary="true" dark="true">
              <AiOutlineCheckCircle /> Save This Job
            </SaveButton>
          </Skeleton>
        )}

        {/* <SaveButton
          to="/applicant/home"
          primary="false"
          dark="true"
          onClick={handleSaveJob}
        >
          <BsBookmark /> Save This Job
        </SaveButton> */}
      </ButtonContainer>

      {/* <ChatContainer>
        <ChatInput
          name="message"
          rows="6"
          cols="38"
          placeholder="Enter your message"
        ></ChatInput>
        <MessageButton to="/applicant/home" primary="true" dark="true">
          <MdOutlineMessage /> Send Message
        </MessageButton>
      </ChatContainer> */}
    </SectionWrapper>
  );
}

export default Sidebar;
