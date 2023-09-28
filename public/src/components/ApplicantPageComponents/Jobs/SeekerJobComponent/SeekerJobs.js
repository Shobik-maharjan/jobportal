import axios from "axios";
import React, { useEffect, useState } from "react";
import { getAllActiveJobs, getAllJobs } from "../../../../utils/APIRoutes";
import EmptyView from "../EmptyView/index";
import FilterPanel from "../FilterPanelComponent";
import ListComponent from "../ListComponent/index";
import SearchBar from "../SearchbarComponent";
import {
  ContentHolder,
  HomePanalListWrap,
  HomePanalWrap,
  ListWrap,
} from "./JobComponents";

function SeekerJobs() {
  const [selectedType, setSelectedType] = useState(null);
  const handleSelectType = (event, value) => {
    return !value ? null : setSelectedType(value);
  };

  const [inputSearch, setInputSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState([
    {
      id: 1,
      checked: false,
      label: "Information Technology",
    },
    {
      id: 2,
      checked: false,
      label: "Health",
    },
    {
      id: 3,
      checked: false,
      label: "Entertainment",
    },
    {
      id: 4,
      checked: false,
      label: "Real Estate",
    },
    {
      id: 5,
      checked: false,
      label: "Finance",
    },
  ]);

  const handleChangeChecked = (id) => {
    const changeCheckedCategory = selectedCategory.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );

    setSelectedCategory(changeCheckedCategory);
  };

  const [selectedPrice, setSelectedPrice] = useState([0, 100]);

  const handleChangePrice = (event, value) => {
    setSelectedPrice(value);
  };

  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");

  const [allJobs, setAllJobs] = useState([]);
  const [list, setList] = useState([]);
  const [resultFound, setResultFound] = useState(false);
  const reset = () => {
    console.log("reset");
    setCountry("");
    setRegion("");
    setSelectedType(null);
    setInputSearch("");
    setSelectedCategory([
      {
        id: 1,
        checked: false,
        label: "Information Technology",
      },
      {
        id: 2,
        checked: false,
        label: "Health",
      },
      {
        id: 3,
        checked: false,
        label: "Entertainment",
      },

      {
        id: 4,
        checked: false,
        label: "Real Estate",
      },
      {
        id: 5,
        checked: false,
        label: "Finance",
      },
    ]);
  };

  const applyFilter = () => {
    let updatedList = allJobs;

    if (selectedType) {
      updatedList = updatedList.filter(
        (item) => item.type !== "Remote Delivery"
      );
    }

    const categoryChecked = selectedCategory
      .filter((item) => item.checked)
      .map((item) => item.label);

    if (categoryChecked.length > 0) {
      updatedList = updatedList.filter((item) => {
        return categoryChecked.includes(item.sector);
      });
    }

    const minPrice = selectedPrice[0] * 1000;
    const maxPrice = selectedPrice[1] * 1000;

    updatedList = updatedList.filter(
      (item) => item.salary >= minPrice && item.salary <= maxPrice
    );

    if (country !== "") {
      updatedList = updatedList.filter(
        (item) => item.company.country === country
      );
    }

    if (region !== "") {
      updatedList = updatedList.filter(
        (item) => item.company.region === region
      );
    }

    // if (inputSearch) {
    //   updatedList = updatedList.filter(
    //     (item) =>
    //       item.title.toLowerCase().search(inputSearch.toLowerCase().trim()) !==
    //         -1 ||
    //       item?.company?.name
    //         ?.toLowerCase()
    //         .search(inputSearch.toLowerCase().trim()) !== -1
    //   );
    // }

    // if (inputSearch) {
    //   const searchTerm = inputSearch.toLowerCase().trim();
    //   updatedList = updatedList.filter((item) => {
    //     const jobTitle = item?.title.toLowerCase();
    //     const companyName = item?.company?.name?.toLowerCase() || "";

    //     return (
    //       jobTitle.includes(searchTerm) || companyName.includes(searchTerm)
    //     );
    //   });
    // }

    if (inputSearch) {
      const searchTerm = inputSearch.toLowerCase().trim();
      const filteredList = [];

      for (const item of updatedList) {
        const jobTitle = item?.title.toLowerCase();
        const companyName = item?.company?.name?.toLowerCase() || "";

        if (jobTitle.includes(searchTerm) || companyName.includes(searchTerm)) {
          filteredList.push(item);
        }
      }

      updatedList = filteredList;
    }

    setList(updatedList);

    !updatedList.length ? setResultFound(false) : setResultFound(true);
  };

  // const ascending = () => {
  //   let data = [...allJobs];
  //   if (data.length > 0) {
  //     let result = data.sort((a, b) =>
  //       a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
  //     );
  //     setList(result);
  //   }
  // };

  // const descending = () => {
  //   let data = [...allJobs];
  //   if (data.length > 0) {
  //     let result = data.sort((a, b) =>
  //       a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1
  //     );
  //     setList(result);
  //   }
  // };

  // // Quick Sort Algorithm
  // function quickSort(arr) {
  //   if (arr.length <= 1) {
  //     return arr;
  //   }

  //   const pivot = arr[0];
  //   const left = [];
  //   const right = [];

  //   for (let i = 1; i < arr.length; i++) {
  //     if (arr[i].title.toLowerCase() <= pivot.title.toLowerCase()) {
  //       left.push(arr[i]);
  //     } else {
  //       right.push(arr[i]);
  //     }
  //   }

  //   return [...quickSort(left), pivot, ...quickSort(right)];
  // }

  // const ascending = () => {
  //   const data = [...allJobs];
  //   if (data.length > 0) {
  //     const result = quickSort(data);
  //     setList(result);
  //   }
  // };

  // const descending = () => {
  //   const data = [...allJobs];
  //   if (data.length > 0) {
  //     const result = quickSort(data).reverse();
  //     setList(result);
  //   }
  // };

  // Bubble Sort Algorithm
  function bubbleSort(arr) {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j].title.toLowerCase() > arr[j + 1].title.toLowerCase()) {
          // Swap the elements
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
  }

  const ascending = () => {
    const data = [...allJobs];
    if (data.length > 0) {
      bubbleSort(data);
      setList(data);
    }
  };

  const descending = () => {
    const data = [...allJobs];
    if (data.length > 0) {
      bubbleSort(data);
      data.reverse();
      setList(data);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [
    selectedType,
    selectedCategory,
    selectedPrice,
    country,
    region,
    inputSearch,
  ]);

  useEffect(() => {
    //get all jobs from database
    setLoading(true);
    try {
      axios.get(getAllActiveJobs).then((res) => {
        setAllJobs(res.data.data);
        setList(res.data.data);
        setLoading(false);
        reset();
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div id="jobs">
      <ContentHolder>
        <SearchBar
          value={inputSearch}
          changeInput={(e) => setInputSearch(e.target.value)}
        />
        <HomePanalListWrap>
          <HomePanalWrap>
            <FilterPanel
              selectToggle={handleSelectType}
              selectedType={selectedType}
              selectedCategory={selectedCategory}
              changeChecked={handleChangeChecked}
              selectedPrice={selectedPrice}
              changedPrice={handleChangePrice}
              setCountry={setCountry}
              country={country}
              region={region}
              setRegion={setRegion}
              reset={reset}
            />
          </HomePanalWrap>
          <ListWrap>
            {resultFound ? (
              <ListComponent
                list={list}
                isLoading={!loading}
                ascending={ascending}
                descending={descending}
              />
            ) : (
              <EmptyView />
            )}
          </ListWrap>
        </HomePanalListWrap>
      </ContentHolder>
    </div>
  );
}

export default SeekerJobs;
