import { useContext, useState } from "react";
import SearchIcon from "../../assets/svg/searchIcon";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../App";

export default function Searchbar() {
    const navigate = useNavigate();
    const { searchTerm, setSearchTerm } = useContext(SearchContext);
    const [isHovered, setIsHovered] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== "") {
            navigate('/SearchResult');
        }
    };

    const clearInput = (e) => {
        e.preventDefault();
        setSearchTerm('');
    };

    return (
        <div 
            onMouseOver={() => setIsHovered(true)}
            className={`flex items-center font-medium text-[14px] rounded-[4px] overflow-hidden ${isHovered ? "bg-[#e6e7e8] animate-opacity" : ""}`}
        >
            {isHovered && 
                <form className="searchContainer" onSubmit={handleSearch}>
                    <input 
                        type="text" 
                        placeholder="What are you looking for?" 
                        value={searchTerm || ''}  // Ensure the value is always a string
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        onClick={clearInput}
                        className="bg-[#e6e7e8] px-[1rem] py-[10px] animate-search"
                    />
                </form>
            }
            <div className="px-[1rem] z-10">
                <SearchIcon width={"22px"} height={"22px"} color={"#585958"} />
            </div>
        </div>
    );
}
