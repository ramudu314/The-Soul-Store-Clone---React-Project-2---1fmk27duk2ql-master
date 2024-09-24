// import { useContext, useEffect, useState } from "react";
// import { UserContext } from "../context/userContext";
// import { fetch_data } from "../utils/utilities";

// export default function useFetchSingleProduct(url) {
//     const { projectId } = useContext(UserContext);

//     const [data, setData] = useState([]);
//     const [error, setError] = useState("");
//     const [isLoading, setIsLoading] = useState(false);

//     function filterData(items) {
//         if (!Array.isArray(items)) {
//             console.error("Expected an array, but got:", items);
//             return [];
//         }

//         return items
//             .filter(item => item != null) // Remove null or undefined items
//             .map(item => ({
//                 productId: item._id,
//                 brand: item.brand,
//                 color: item.color,
//                 description: item.description,
//                 displayImage: item.displayImage,
//                 gender: item.gender,
//                 images: item.images,
//                 Name: item.name,
//                 price: item.price,
//                 ratings: item.ratings,
//                 seller: item.seller,
//                 sellerTag: item.sellerTag,
//                 size: item.size,
//                 subCategory: item.subCategory,
//             }));
//     }

//     useEffect(() => {
//         if (!url) return; // Return early if no URL is provided
        
//         setIsLoading(true); // Set loading to true before fetching data
//         fetch_data(url, projectId)
//             .then(response => {
//                 console.log("Raw response:", response); // Log the raw response

//                 // Check if the response has a data field
//                 const result = response?.data || [];
//                 console.log("Fetched data:", result); // Log the fetched data
                
//                 const modifiedData = filterData(result); // Filter and format the data
//                 setData(modifiedData); // Update the data state
//                 setIsLoading(false); // Set loading to false after fetching data
//             })
//             .catch(error => {
//                 console.error("Error fetching data:", error);
//                 setError(error.message || "An error occurred"); // Update error state
//                 setIsLoading(false); // Set loading to false in case of error
//             });
//     }, [url, projectId]); // Dependencies for useEffect: url and projectId

//     return [data, error, isLoading]; // Return the data, error, and loading status
// }


// import { useContext, useEffect, useState } from "react";
// import { UserContext } from "../context/userContext";
// import { fetch_data } from "../utils/utilities";

// export default function useFetchSingleProduct(url) {
//     const { projectId } = useContext(UserContext);

//     const [data, setData] = useState([]);
//     const [error, setError] = useState("");
//     const [isLoading, setIsLoading] = useState(false);

//     function filterData(items) {
//         // Ensure items is an array
//         if (!Array.isArray(items)) {
//             console.error("Expected an array, but got:", items);
//             items = [items];
//         }

//         return items
//             .filter(item => item != null) 
//             .map(item => ({
//                 productId: item._id,
//                 brand: item.brand,
//                 color: item.color,
//                 description: item.description,
//                 displayImage: item.displayImage,
//                 gender: item.gender,
//                 images: item.images,
//                 Name: item.name,
//                 price: item.price,
//                 ratings: item.ratings,
//                 seller: item.seller,
//                 sellerTag: item.sellerTag,
//                 size: item.size,
//                 subCategory: item.subCategory,
//             }));
//     }

//     useEffect(() => {
//         if (!url) return; 
//         setIsLoading(true); 
//         fetch_data(url, projectId)
//             .then(response => {
//                 console.log("Raw response:", response);

//                 const result = response?.data || []; 
//                 console.log("Fetched data:", result); 
                
//                 const modifiedData = filterData(result); 
//                 setData(modifiedData); 
//                 setIsLoading(false); 
//             })
//             .catch(error => {
//                 console.error("Error fetching data:", error);
//                 setError(error.message || "An error occurred"); 
//                 setIsLoading(false); 
//             });
//     }, [url, projectId]); 

//     return [data, error, isLoading]; 
// }



import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { fetch_data } from "../utils/utilities";






export default function useFetchSingleProduct(url) {
    const {projectId}= useContext(UserContext);

    const [data, setData]= useState([]);
    const [error, setError]= useState("");
    const [isLoading, setIsLoading]= useState(false);


    function filterData(item) {
        return {
            productId:item._id,
            brand: item.brand,
            color: item.color,
            description: item.description,
            displayImage: item.displayImage,
            gender: item.gender,
            images: item.images,
            productName: item.name,
            price: item.price,
            ratings: item.ratings,
            seller: item.seller,
            sellerTag: item.sellerTag,
            size: item.size,
            subCategory: item.subCategory,
        }
    }

    useEffect(() => {
        setIsLoading(true);
        try {
            fetch_data(url, projectId)
            .then((data) => {
                const modifiedData= filterData(data);
                setData(modifiedData);
            })
            .catch((error) => {
                console.log("error in data: ", error);
            })
        } catch(error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, [url]);

    return [data, error, isLoading];
}