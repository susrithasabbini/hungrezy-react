import RestaurantTopBar from "@/components/Restaurant/RestaurantTopBar";
import RestaurantGrid from "@/components/Restaurant/RestaurantGrid";
import { useEffect, useState } from "react";
import RestaurantMenu from "./RestaurantMenu";
import NoDelivery from "@/components/Restaurant/NoDelivery";

const Restaurants = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState("Hyderabad-Jubilee Hills");
  const [visibleRestaurants, setVisibleRestaurants] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const arr = location.split("-");
        const key1 = arr[0].trim(); // Replace with your key1
        const key2 = encodeURIComponent(arr[1].trim()); // Replace with your key2
        console.log(key1, key2);
        const response = await fetch(
          `${
            import.meta.env.VITE_HUNGREZY_API
          }/api/restaurant?city=${key1}&area=${key2}`
        );
        if (!response.ok) {
          setData(null);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        const restaurants = result.data;
        setData(restaurants);
        console.log(restaurants);
        setVisibleRestaurants(0);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location]);

  useEffect(() => {
    if (data != null) {
      const temp = filterRestaurants(searchText, data);
      setSearchResults(temp);
    }
  }, [searchText]);

  function getRandomInt(n) {
    return Math.floor(Math.random() * n) + 1;
  }

  const filterRestaurants = (searchText, restaurants) => {
    const normalizedSearchText = searchText.toLowerCase();

    return restaurants.filter((restaurant) => {
      // Check if search text matches restaurant name
      if (restaurant.name.toLowerCase().includes(normalizedSearchText)) {
        return true;
      }

      // Check if search text matches cuisine
      if (restaurant.cuisine.toLowerCase().includes(normalizedSearchText)) {
        return true;
      }

      // // Check if search text matches any menu category
      // const menuCategories = Object.keys(restaurant.menu);
      // if (
      //   menuCategories.some((category) =>
      //     category.toLowerCase().includes(normalizedSearchText)
      //   )
      // ) {
      //   return true;
      // }

      // // Check if search text matches any food item name
      // const menuItems = Object.values(restaurant.menu).reduce(
      //   (acc, category) => {
      //     return acc.concat(Object.keys(category));
      //   },
      //   []
      // );
      // if (
      //   menuItems.some((item) =>
      //     item.toLowerCase().includes(normalizedSearchText)
      //   )
      // ) {
      //   return true;
      // }

      // Add more conditions as needed

      return false;
    });
  };

  return (
    <div className="mt-32">
      <RestaurantTopBar
        location={location}
        setLocation={setLocation}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      {data != null && searchText == "" && (
        <div className="mt-6">
          <RestaurantGrid
            restaurants={data}
            visibleRestaurants={visibleRestaurants}
            setVisibleRestaurants={setVisibleRestaurants}
          />
        </div>
      )}
      {data != null && searchText != "" && searchResults.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg text-gray-600 mb-2 ml-10 font-semibold">
            Your Search Results for '{searchText}'
          </h3>
          <RestaurantGrid
            restaurants={searchResults}
            visibleRestaurants={visibleRestaurants}
            setVisibleRestaurants={setVisibleRestaurants}
          />
        </div>
      )}
      {data == null && (
        <div className="h-fit">
          <NoDelivery />
        </div>
      )}
    </div>
  );
};

export default Restaurants;

var imageArray = [
  "https://b.zmtcdn.com/data/pictures/chains/1/50471/6fa39637442e85efb64a5c0db7b31b7f_o2_featured_v2.jpg?output-format=webp",
  "https://b.zmtcdn.com/data/pictures/chains/8/19748518/b3ae5fda4e958ffbcf938275cda8ea8e_o2_featured_v2.jpg?output-format=webp",
  "https://b.zmtcdn.com/data/pictures/6/20890746/e048a322ba211ae790c481f2aa18b41d_o2_featured_v2.jpg?output-format=webp",
  "https://b.zmtcdn.com/data/pictures/chains/5/61555/8c49ba335683507ba6ddee2dc84966e8_o2_featured_v2.jpg?output-format=webp",
  "https://b.zmtcdn.com/data/pictures/7/19168677/f141adefe75f49e49befa49b62139463_o2_featured_v2.jpg?output-format=webp",
  "https://b.zmtcdn.com/data/pictures/4/19535924/ab7b24ccae3af976ea61431e222c8b10_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/chains/2/57282/2e488a2fdd92381877295b81802c1a33_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/chains/0/18924790/2bb03e756465e70fee66ed043a4fa6f0_o2_featured_v2.jpeg",
  "https://b.zmtcdn.com/data/pictures/chains/8/18556248/1450cacf9600dacf30819c50d784ddb8_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/5/18769675/5dc3cdac140e735441ca350281577d14_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/chains/8/54308/81cab239d11c646e76cc35b01b25c180_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/0/19663100/a3eb531ce4d5cfc1e7a82a3023dd642c_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/chains/9/59179/d500edec7041e0150a1212c8dcc24cfa_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/chains/9/60069/b5715d104a2580bb908f126b8dee7028_o2_featured_v2.jpeg",
  "https://b.zmtcdn.com/data/pictures/chains/6/18613656/d3076b5ba74eeab01fc7491493b5bf7a_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/2/18791092/38af17cbfa7c62906d376498b852c17d_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/chains/7/20273127/f15dc3b2bf69af937c31389c021be7a1_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/chains/3/18343993/a8c84349c1138e70cf3870a850f5e29d_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/chains/4/19225214/aed6598e604214342deaacc7d985257f_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/chains/5/18140795/04a11aedf8b6c567b4a326986189c69e_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/4/19786584/0c42b19e15771d27fec26406adfe76cb_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/chains/2/19494942/6c0a07c8eb3513757ac4802a1d03b21f_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/chains/9/19051939/631e94b5e92a24f8dc745a253a4caeeb_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/chains/7/20246497/2b6f80091e6478fad73c73f5dca84270_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/9/19422319/7efae94e482a2becb104ffd4f2f1fd33_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/chains/6/18414356/522c841b508bc12db4802df4fdd88b18_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/9/18946469/bb269e260f34d2e81ed3ba1b9db46254_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/chains/2/18817272/5d4040eeaef9f042ec8ec845f9b1911f_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/1/19684181/14dddc8d4d8c5d55bd6ab839752e787f_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/chains/4/50714/527f3baa5ed9aa3a739c36f9fc410404_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/chains/6/95776/dd1f36231c1871dedd091818774568ca_o2_featured_v2.jpg?output-format=webp",
  "https://b.zmtcdn.com/data/pictures/chains/0/93970/ae0a71b4d560c4bcf7f52761c614fcc1_o2_featured_v2.jpg?output-format=webp",
  "https://b.zmtcdn.com/data/pictures/6/20635616/1a688e78f42da4a35800058899cef4d5_o2_featured_v2.jpg?output-format=webp",
  "https://b.zmtcdn.com/data/pictures/chains/3/93043/3088315ab85025468fb789f2871bf131_o2_featured_v2.jpg?output-format=webp",
  "https://b.zmtcdn.com/data/pictures/9/18900799/2c6fdb1bbaf60f11daed673ca6150906_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/chains/1/91711/f3704598c336542166b781026fc5ad4b_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/1/19497661/f3e30f26bacec0c1792418bd23df5759_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/chains/6/94336/b11958906834b77171383978608a20ef_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/chains/9/91999/ac37ff595764daab5390ed616dc6e10d_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/chains/7/18427297/bd298c7ad983482efed7b9eaa08c9722_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/chains/8/18138658/a6c8129329bf976270361b45058f110b_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/chains/2/18423512/d9227ad0a97f0f13d3fb88e6af9053a3_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/0/20692800/56ed24c2a43a10069e50784c6b4955ae_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/7/18858177/fc0c6dd31568f87df7e861d2bfaca9aa_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/chains/8/18948828/f970cc68d7d250e4ab1614b69ba704e0_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/1/19214961/9efcc0b0e84aa0c9fe4abb63c05006e8_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/chains/0/92020/3088315ab85025468fb789f2871bf131_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/2/18265582/c73c7974c42c3a5b92821bf482e3f156_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/chains/7/97567/6ccd1bea55bae9e88f4bd066c37debe7_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/chains/5/18685605/a3725539803ba01fa2f2c5dec2b37e32_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/5/94405/235a2e55b438d107436830241ba6545f_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/7/19675617/df7bac2b0fe399a369a172c95a05653a_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/chains/0/19279320/522c841b508bc12db4802df4fdd88b18_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/chains/2/18375822/e2a88afa92fbde9ac5573456ce80383c_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/chains/1/18362381/a8c84349c1138e70cf3870a850f5e29d_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/chains/4/90164/8c39c049240e2fcf475708468c66219d_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/6/18313046/229617cef8c413b9f39c93de13a64ff3_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/chains/1/90391/5bc645dbf2bed815eb65c8e5f1d7b5ea_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/2/20684052/730053fc5e20bf9fe816a61a39b80604_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/9/20065309/c2d743cc3acc5bb4b4dd00fe2f66cae4_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/chains/6/16517756/b5ef80bf0f548238baa16b10cef609a9_o2_featured_v2.jpg?output-format=webp",
  "https://b.zmtcdn.com/data/pictures/chains/2/19227162/b46307a6a28d24ecf69d5ec83ee9d451_o2_featured_v2.jpg?output-format=webp",
  "https://b.zmtcdn.com/data/pictures/2/18841032/005abb05ba395fca33ab46d07abb7500_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/6/19916776/12eaa60947577a938716cc9aa9e15a24_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/5/18228785/3b463e6aead39df1eaaf1af0998e503b_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/7/20630947/0fcba758661474666687d5d363a0b9be_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/1/19891741/4296bba0b051aa2c158348ba622a5e98_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/1/20145491/47a30f26750ee76f15d0c2066169834d_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/6/19589616/ca380b4ea5487c5ad17d5b7421702068_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/2/19454532/d7fe09e86d732cfdfcf1c13b6560913a_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/chains/8/18989178/ac7c33889cf31d49539aacbcc9472ee6_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/0/20599050/c7540ac9bc3528825d0a01c3a5eb78bb_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/9/20253809/a97231a7c99e1ef71d546d50581807b4_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/chains/4/20223754/915b712fd765d3d7d302aad013b7cf1e_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/3/20477493/d688eb852272e69a728af3a80459c813_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/9/18979869/d1a1642222a74286971b1543c6886be8_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/1/18350921/b242c88f79452dd7f0f5222514d0d1d8_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/2/19775802/f18fa0b5ce45007dd577e085a50d3f5a_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/5/20613525/37750871991fc4a1dfb8c9013cab2498_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/2/20391132/e417a1feb6b7aadd0045ac70d4a546d9_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/2/19914542/0ba2b47907ba24ac49fdda305eec5acb_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/9/20255709/77fff737d0481bb34ef0b9cd8b914798_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/9/19914539/9b7b610745ad970ed44e97361661e6ca_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/chains/1/19686801/c88fe4c035483a15e1fc6b82d6073eab_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/chains/7/19847867/3ed6e6431ffbbd069883c324fc940075_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/9/19680659/550ddd6ec82343c151b5cd9706c635d7_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/7/20782987/db78d54eee22d388012fa469f9e8a032_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/7/19338297/0559bc4830f277b281ef1442198e3a77_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/5/19392025/a4bfd9753f30c1729807f51b80c6e357_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/2/20583362/2069f6f054fed6846f1547506dea1a72_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/7/19914537/522a980e2d7bfb89fe29f1f6f6213c29_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/1/19914541/8d7d52d99b6a3f17ff4add367b189f5c_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/1/20732511/5372470d0dabc8300c72c9fda26ad69b_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/5/20695625/a01ae6733e643acef236e7b7eb1357a4_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/4/19914544/0ba2b47907ba24ac49fdda305eec5acb_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/5/20082035/a4839877b60328649751c2cfe1381bf6_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/2/20800902/65407962b844f6895c65ac3648f48fe9_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/3/19914543/a66def74685e44f8efeda2033f48cb65_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/1/19443951/b96a4c0075327803093de9380d5398dc_o2_featured_v2.jpg",
  "https://b.zmtcdn.com/data/pictures/3/19764923/361a76641cad29b4a87d26b029bea4b6_o2_featured_v2.jpg",
];
