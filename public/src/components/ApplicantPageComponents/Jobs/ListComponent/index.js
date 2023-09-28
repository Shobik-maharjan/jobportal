import { useState } from "react";
import Job from "./ListCard";
import { JobCardsHoler, Sort, SortButton, Text } from "./listElements";
import { Button } from "@material-ui/core";

function ListComponent({ list, isLoading, ascending, descending }) {
  const [sortedType, setSortType] = useState();

  // const ascending = () => {
  //   let data = [...allJobs];
  //   if (data.length > 0) {
  //     let result = data.sort((a, b) =>
  //       a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
  //     );
  //     setSort(result);
  //   }
  // };

  // const desending = () => {
  //   let data = [...allJobs];
  //   if (data.length > 0) {
  //     let result = data.sort((a, b) =>
  //       a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1
  //     );
  //     setSort(result);
  //   }
  // };

  // // console.log(new Date().toISOString());
  // useEffect(() => {
  //   //get all jobs from database
  //   try {
  //     axios.get(getAllActiveJobs).then((res) => {
  //       setAllJobs(res.data.data);
  //       // const currentDate = new Date();
  //       // const activeJob = res.data.data.filter(
  //       //   (item) => new Date(item.closeDate) <= currentDate
  //       // );
  //       console.log(allJobs);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  return (
    { isLoading } && (
      <JobCardsHoler>
        <Sort>
          <Text>Sort by:</Text>

          <SortButton onClick={ascending}>Ascending</SortButton>
          <SortButton onClick={descending}>Descending</SortButton>

          {/* <select
              style={{ height: "35px" }}
              defaultValue={"DEFAULT"}
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="DEFAULT" disabled>
                None
              </option>
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
            </select> */}
        </Sort>

        {list?.map((item) => {
          return <Job item={item} />;
        })}
      </JobCardsHoler>
    )
  );
}

export default ListComponent;
