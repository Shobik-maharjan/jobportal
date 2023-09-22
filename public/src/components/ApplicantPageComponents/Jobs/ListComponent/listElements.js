import styled from "styled-components";
export const JobCardsHoler = styled.div`
  margin: 1rem auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 1000px) {
    justify-content: center;
  }
`;
export const JobCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  max-width: 30%;
  justify-content: inherit;
  transition: box-shadow 0.3s ease-in;
  margin: 1rem;
  position: relative;
  overflow: hidden;
  border-radius: 10%;
  @media screen and (max-width: 1000px) {
    max-width: 40%;
  }
  @media screen and (max-width: 910px) {
    max-width: 70%;
  }
  @media screen and (max-width: 680px) {
    max-width: 80%;
  }

  &:hover {
    transform: scale(1.05);
    // box-shadow: 1px 8px 20px rgba(69, 65, 221, 0.75);
    transition: all 0.1s ease-in-out;
    // backdrop-filter: blur(50px);
  }

  &::before {
    content: "";
    position: absolute;
    height: 150%;
    width: 40%;
    top: -15%;
    right: 0;
    left: 0;
    margin: auto;

    animation: animate 10s linear infinite;

    @keyframes animate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }

  &::after {
    content: "";
    position: absolute;
    inset: 5px;
    background: rgb(41 48 63 / 18%);
    border-radius: 10%;
  }
`;

export const CompanyInfoHoler = styled.div`
  display: grid;
  grid-template-columns: [image-row] 1fr [content-row] 6fr;
  width: 100%;
  justify-content: space-between;
  /* background-color: white; */
  padding: 1rem 2rem;
  text-align: center;

  padding-left: 0;
  transition: all 0.2s ease-in-out;

  .box1 {
    grid-column-start: image-row;
    transition: all 0.2s ease-in-out;
  }
  .box2 {
    grid-column-start: content-row;
    transition: all 0.2s ease-in-out;
    margin-left: 0.5rem;
    color: black;
    h6 {
      margin: 0;
      text-align: left;
    }

    p {
      transition: all 0.2s ease-in-out;
      text-align: left;
      font-size: 14px;
      margin: 0;
    }
  }
`;

export const JobTitleHolder = styled.div`
  margin: 0.5rem 0;
  color: black;
`;

export const JobTitle = styled.h4`
  margin-bottom: 0;
  font-family: "Encode Sans Expanded", sans-serif;
`;

export const JobType = styled.p`
  font-size: 15px;
  font-family: "Encode Sans Expanded", sans-serif;
`;

export const JobDescriptionBox = styled.div`
  width: inherit;
`;

export const JobDescription = styled.p`
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  color: rgb(112, 137, 157);
  font-family: "Source Sans Pro", sans-serif;
  color: black;
`;

export const JobFooter = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
`;

export const Salary = styled.h5`
  font-weight: bold;
  color: black;
`;
export const Muted = styled.span`
  font-size: 12px;
  color: gray;
`;

export const ApplyButton = styled.button`
  border: none;
  outline: none;
  color: white;
  background-color: #3a3636;
  border-radius: 7px;
  border: 2px solid #fff;
  padding: 0.2rem 0.5rem;
  transition: all 0.3s ease-in-out;

  &:hover {
    transition: all 0.3s ease-in-out;

    background-color: rgb(0, 0, 0);
    color: white;
  }
`;
