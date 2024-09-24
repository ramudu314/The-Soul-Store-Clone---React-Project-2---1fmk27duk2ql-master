import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './SearchResult.css';
import { SearchContext } from '../../App'; // Import the SearchContext
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function ProductSearch() {
  const { searchTerm } = useContext(SearchContext); // Use searchTerm from context
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const projectId = 'f104bi07c490'; // Replace with your actual project ID

  useEffect(() => {
    if (searchTerm.trim()) {
      const fetchProducts = async () => {
        setLoading(true);
        setError(null);

        try {
          const response = await axios.get(
            'https://academics.newtonschool.co/api/v1/ecommerce/clothes/products',
            {
              params: {
                search: JSON.stringify({name: searchTerm}), // Use searchTerm from context
              },
              headers: {
                projectId: projectId,
              },
            }
          );

          setProducts(response.data.data);
        } catch (err) {
        //   setError('Failed to fetch products. Please try again later.');
          toast.error('Failed to fetch products. Please try again later.');

        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    } else {
      setProducts([]); // Clear products if the search term is empty
    }
  }, [searchTerm]);

  const placeholderArray = new Array(20).fill('');

  return (
    <div className="w-full p-[10px] min-[425px]:p-[1rem]">
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">Error: {error}</div>}

      <div className="grid-container">
        {products.length > 0 ? (
          products.map((product) => {
            const { name, displayImage, price, subCategory, _id } = product;

            return (
                    <Link to={`/product/${_id}`}>
              <div key={_id} className="product-item p-[10px] w-full cursor-pointer">
                <div className="relative flex items-center justify-center bg-[#f2f2f2] w-[150px] h-[190px]
                                                bg-[#3d3c3c] overflow-hidden
                                                sm:w-[180px] sm:h-[220px]
                                                md:w-[230px] md:h-[290px]
                                                lg:w-[340px] lg:h-[420px]">
                  <img
                    src={displayImage}
                    alt={name}
                    className="w-full h-full duration-500 hover:scale-110"
                  />
                </div>
                <div className="product-info font-medium text-[12px] text-[#737577] mt-[10px] 
                                                md:text-[14px] lg:text-[15px]">
                  <p className="product-name">{name.slice(0,25) + "..."}</p>
                  <p className="product-subcategory">{subCategory}</p>
                  <p className="product-price">₹ {price}</p>
                </div>
              </div>
              </Link>
              
            );
          })
        ) : (
          !loading &&
          placeholderArray.map((_, index) => (
            <div key={index} className="product-item loading-placeholder">
              <div className="product-image-placeholder"></div>
              <div className="product-info-placeholder">
                <p className="info-placeholder"></p>
                <p className="info-placeholder"></p>
                <p className="info-placeholder"></p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductSearch;
