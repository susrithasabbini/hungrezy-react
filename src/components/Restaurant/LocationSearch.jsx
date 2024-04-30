// LocationSearch.js
import React, { useState, useEffect } from 'react';
import { IoLocationOutline } from "react-icons/io5";
import { FaLocationCrosshairs } from "react-icons/fa6";
import axios from 'axios';

const LocationSearch = ({isSticky,searchText,setSearchText}) => {
 
  const [keysAtLevel1, setKeysAtLevel1] = useState([]);
  const [keysAtLevel2, setKeysAtLevel2] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedKey1, setSelectedKey1] = useState('');
  const [selectedKey2, setSelectedKey2] = useState('');
  const [initialResult,setInitialResult] = useState([]);

  useEffect(() => {
    // Fetch keys when the component mounts
    fetchKeys();
  }, []);

  // const fetchKeys = () => {
  //   // Fetch keys from the server using the /getAllKeys route
  //   fetch(`${import.meta.env.VITE_HUNGREZY_API}/restaurant/locations`)
  //     .then(response => response.json())
  //     .then(data => {
  //       const { keysAtLevel1, keysAtLevel2 } = data;
  //       setKeysAtLevel1(keysAtLevel1);
  //       setKeysAtLevel2(keysAtLevel2);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching keys:', error);
  //     });
  // };

  const fetchKeys = () => {
    fetch(`${import.meta.env.VITE_HUNGREZY_API}/api/restaurant/locations`)
      .then(response => response.json())
      .then(data => {
        const { data: locations } = data; // Assuming the locations are nested under the 'data' key
        setKeysAtLevel1(Object.keys(locations));
        setKeysAtLevel2(locations);
      })
      .catch(error => {
        console.error('Error fetching keys:', error);
      });
  };
  

  // useEffect(() => {
  //   // Arrange key1s alphabetically
  //   const sortedKey1s = keysAtLevel1.slice().sort();
  
  //   // Arrange key2s alphabetically within each key1
  //   const sortedResults = sortedKey1s.map(key1 => ({
  //     key1,
  //     key2s: keysAtLevel2[key1].slice().sort(),
  //   }));
  
  //   setInitialResult(sortedResults);
  // }, [keysAtLevel1, keysAtLevel2]);

  useEffect(() => {
    // Arrange key1s alphabetically
    const sortedKey1s = keysAtLevel1.slice().sort();
  
    // Arrange key2s alphabetically within each key1
    const sortedResults = sortedKey1s.map(key1 => ({
      key1,
      key2s: keysAtLevel2[key1].slice().sort(),
    }));
  
    setInitialResult(sortedResults);
  }, [keysAtLevel1, keysAtLevel2]);
  
  

  useEffect(() => {
    if (searchText.length === 0) {
      // If searchText is empty, display all key1s with their corresponding key2s
      // Arrange key1s alphabetically
        const sortedKey1s = keysAtLevel1.slice().sort();
    
        // Arrange key2s alphabetically within each key1
        const sortedResults = sortedKey1s.map(key1 => ({
        key1,
        key2s: keysAtLevel2[key1].slice().sort(),
        }));
    
        setInitialResult(sortedResults);
      return;
    }

    // Filter results based on the search text
    const filteredResults = filterResults(searchText);
    setSearchResults(filteredResults);
  }, [searchText, keysAtLevel1, keysAtLevel2]);


// const filterResults = (searchText) => {
//     searchText = searchText.toLowerCase();
//     return keysAtLevel1.reduce((filteredResults, key1) => {
//       const matchingKey2s = keysAtLevel2[key1].filter(key2 =>
//         key2.toLowerCase().includes(searchText)
//       );
  
//       if (matchingKey2s.length > 0) {
//         // Include key1 and matching key2s in the results
//         filteredResults.push({
//           key1,
//           key2s: matchingKey2s,
//         });
//       }
  
//       return filteredResults;
//     }, []);
//   };


const filterResults = (searchText) => {
  searchText = searchText.toLowerCase();
  return keysAtLevel1.reduce((filteredResults, key1) => {
    const matchingKey2s = keysAtLevel2[key1].filter(key2 =>
      key2.toLowerCase().includes(searchText)
    );

    if (matchingKey2s.length > 0) {
      // Include key1 and matching key2s in the results
      filteredResults.push({
        key1,
        key2s: matchingKey2s,
      });
    }

    return filteredResults;
  }, []);
};



  useEffect(() => {
    // Arrange key1s alphabetically
    const sortedKey1s = searchResults.map(result => result.key1).sort();
  
    // Arrange key2s alphabetically within each key1
    const sortedResults = sortedKey1s.map(key1 => ({
      key1,
      key2s: searchResults.find(result => result.key1 === key1).key2s.slice().sort(),
    }));
  
    setSearchResults(sortedResults);
  }, [searchText]);


  const locateMe = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Use the OpenCage Geocoding API to get the address
          const apiKey = '78c1d7dfb8434e56a448612a32758adf';
          const geocodingApiUrl = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude}+${longitude}&language=en`;

          try {
            const response = await axios.get(geocodingApiUrl);
            let city = response.data.results[0].components.suburb;
            const state = response.data.results[0].components.state;
            console.log(response.data.results[0].components);
            if(!city)city =  response.data.results[0].components.village;
            setSearchText(`${city}-${state}`);
            setSearchResults([]); // Clear search results
          } catch (error) {
            console.error('Error fetching address:', error.message);
          }
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };
  

  const handleResultClick = (key1, key2) => {
    // Store selected key1 and key2
    setSelectedKey1(key1);
    setSelectedKey2(key2);
    setSearchText(`${key1} - ${key2}`); // Set searchText to display the selected keys in the input
    setSearchResults([]); // Clear search results
  };

  return (
    <div  className="relative">
        <IoLocationOutline className={`inline text-4xl ${searchText.length==0 || isSticky ? 'text-gray-400':'text-white'} mb-2`}/>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onFocus={() => setSearchResults(initialResult)}
        placeholder="Set Your Location"
        className={`${
            isSticky ? ' text-gray-500' : ' text-white'
          }  p-2 rounded w-80 h-12 focus:outline-none bg-transparent`}
      />
      <div className={`z-10  w-full max-h-[36rem] overflow-auto  bg-white border rounded shadow-lg ${searchResults.length==0? 'invisible' : 'absolute'}`}>
        {searchResults.map((result, index) => (
          result.key1 != 'Warangal' && 
          <div key={index} className="p-3">
            {
                index==0 && 
                <div
                className="font-bold text-gray-500 cursor-pointer my-3 pb-3 border-b-2"
                onClick={()=> locateMe()}
                >
                    <FaLocationCrosshairs className='inline mr-3 mb-1 text-xl'/>
                    Get Current Location
                </div>
            }
            <div className="font-bold text-gray-500">{result.key1.toUpperCase()}</div>
            <div className="flex flex-col pl-4 ">
              {result.key2s.map((key2, subIndex) => (
                key2!='link' &&
                <div
                  key={subIndex}
                  className="cursor-pointer hover:bg-gray-100 p-1  text-gray-400"
                  onClick={() => handleResultClick(result.key1, key2)}
                >
                  {key2}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationSearch;
