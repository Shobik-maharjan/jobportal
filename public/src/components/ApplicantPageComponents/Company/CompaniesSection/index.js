import axios from "axios";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { getSectorCompany, host } from "../../../../utils/APIRoutes";
import {
  CategoryContainer,
  ContentHolder,
  HContainer,
  Title,
  TitleContainer,
} from "../../Home/CategorySection/CategoryElements";
import {
  CategoryCard,
  FcAdvertisment,
} from "../../Home/SeekerCompanies/ComapnyElements";
import { ColoredSlogan } from "../../Home/SeekerHero/seekerHeroElements";

function Categories({ white }) {
  var [isTechReady, setIsTechReady] = useState(false);
  var [tech, setTech] = useState([]);
  var [isHealthReady, setIsHealthReady] = useState(false);
  var [health, setHealth] = useState([]);
  var [isEntReady, setIsEntReady] = useState(false);
  var [ent, setEnt] = useState([]);
  var [isFinanceReady, setIsFinanceReady] = useState(false);
  var [finance, setFinance] = useState([]);
  var [isRealReady, setIsRealReady] = useState(false);
  var [real, setReal] = useState([]);
  useEffect(() => {
    axios
      .get(getSectorCompany, {
        params: {
          sector: "Information Technology",
        },
      })
      .then((result) => {
        tech = result.data.data.slice(0, 3);
        setTech(tech);
        setIsTechReady(true);
        console.log(tech);
      });

    axios
      .get(getSectorCompany, {
        params: {
          sector: "Health",
        },
      })
      .then((result) => {
        health = result.data.data.slice(0, 3);
        setHealth(health);
        setIsHealthReady(true);
        console.log(tech);
      });

    axios
      .get(getSectorCompany, {
        params: {
          sector: "Entertainment",
        },
      })
      .then((result) => {
        ent = result.data.data.slice(0, 3);
        setEnt(ent);
        setIsEntReady(true);
        console.log(ent);
      });
    axios
      .get(getSectorCompany, {
        params: {
          sector: "Finance",
        },
      })
      .then((result) => {
        finance = result.data.data.slice(0, 3);
        setFinance(finance);
        setIsFinanceReady(true);
        console.log(finance);
      });
    axios
      .get(getSectorCompany, {
        params: {
          sector: "Real Estate",
        },
      })
      .then((result) => {
        real = result.data.data.slice(0, 3);
        setReal(real);
        setIsRealReady(true);
      });
  }, []);
  return (
    <CategoryContainer white={white}>
      <ContentHolder>
        <TitleContainer style={{ color: "black" }}>
          <Title>
            Companies Focused in{" "}
            <ColoredSlogan style={{ color: "black" }}>Technology</ColoredSlogan>
          </Title>
        </TitleContainer>
        <HContainer>
          {isTechReady ? (
            tech.map((company) => (
              <CategoryCard
                id={uuid()}
                onClick={(event) =>
                  (window.location.href = `/applicant/company/${company._id}`)
                }
              >
                <div className="box1" id={uuid()}>
                  {/* <FcAdvertisment /> */}
                  <img src={host + "/" + company.avatarImage} alt="ss" />
                </div>
                <div className="box2" id={uuid()}>
                  <h6>{company.name}</h6>
                  <p>
                    {company.region}, {company.country}
                  </p>
                </div>
              </CategoryCard>
            ))
          ) : (
            <div></div>
          )}
        </HContainer>
      </ContentHolder>
      <ContentHolder>
        <TitleContainer>
          <Title style={{ color: "black" }}>
            Companies Focused in{" "}
            <ColoredSlogan style={{ color: "black" }}>
              Health Care
            </ColoredSlogan>
          </Title>
        </TitleContainer>
        <HContainer>
          {isHealthReady ? (
            health.map((company) => (
              <CategoryCard
                id={uuid()}
                onClick={(event) =>
                  (window.location.href = `/applicant/company/${company._id}`)
                }
              >
                <div className="box1" id={uuid()}>
                  <img src={host + "/" + company.avatarImage} alt="ss" />
                </div>
                <div className="box2" id={uuid()}>
                  <h6>{company.name}</h6>
                  <p>
                    {company.region}, {company.country}
                  </p>
                </div>
              </CategoryCard>
            ))
          ) : (
            <div></div>
          )}
        </HContainer>
      </ContentHolder>
      <ContentHolder>
        <TitleContainer>
          <Title style={{ color: "black" }}>
            Companies Focused in{" "}
            <ColoredSlogan style={{ color: "black" }}>
              Entertainment Industry
            </ColoredSlogan>
          </Title>
        </TitleContainer>
        <HContainer>
          {isEntReady ? (
            ent.map((company) => (
              <CategoryCard
                id={uuid()}
                onClick={(event) =>
                  (window.location.href = `/applicant/company/${company._id}`)
                }
              >
                <div className="box1" id={uuid()}>
                  <img src={host + "/" + company.avatarImage} alt="ss" />{" "}
                </div>
                <div className="box2" id={uuid()}>
                  <h6>{company.name}</h6>
                  <p>
                    {company.region}, {company.country}
                  </p>
                </div>
              </CategoryCard>
            ))
          ) : (
            <div></div>
          )}
        </HContainer>
      </ContentHolder>
      <ContentHolder>
        <TitleContainer>
          <Title style={{ color: "black" }}>
            Companies Focused in{" "}
            <ColoredSlogan style={{ color: "black" }}>Finance</ColoredSlogan>
          </Title>
        </TitleContainer>
        <HContainer>
          {isFinanceReady ? (
            finance.map((company) => (
              <CategoryCard
                id={uuid()}
                onClick={(event) =>
                  (window.location.href = `/applicant/company/${company._id}`)
                }
              >
                <div className="box1" id={uuid()}>
                  <img src={host + "/" + company.avatarImage} alt="ss" />{" "}
                </div>
                <div className="box2" id={uuid()}>
                  <h6>{company.name}</h6>
                  <p>
                    {company.region}, {company.country}
                  </p>
                </div>
              </CategoryCard>
            ))
          ) : (
            <div></div>
          )}
        </HContainer>
      </ContentHolder>
      <ContentHolder>
        <TitleContainer>
          <Title style={{ color: "black" }} s>
            Companies Focused in{" "}
            <ColoredSlogan style={{ color: "black" }}>
              Real Estates
            </ColoredSlogan>
          </Title>
        </TitleContainer>
        <HContainer style={{ marginBottom: "2rem" }}>
          {isRealReady ? (
            real.map((company) => (
              <CategoryCard
                id={uuid()}
                onClick={(event) =>
                  (window.location.href = `/applicant/company/${company._id}`)
                }
              >
                <div className="box1" id={uuid()}>
                  <img src={host + "/" + company.avatarImage} alt="ss" />{" "}
                </div>
                <div className="box2" id={uuid()}>
                  <h6>{company.name}</h6>
                  <p>
                    {company.region}, {company.country}
                  </p>
                </div>
              </CategoryCard>
            ))
          ) : (
            <div></div>
          )}
        </HContainer>
      </ContentHolder>
    </CategoryContainer>
  );
}

export default Categories;
