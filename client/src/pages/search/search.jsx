import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./search.css";
import SearchDisplay from "../../components/SearchDisplay";
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner'

const Search = () => {
    const { query } = useParams();
    const [searchType, setSearchType] = useState("both");
    const [inputValue, setInputValue] = useState(query || "");
    const [searchValue, setSearchValue] = useState("");
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (query) {
            setIsLoading(true);
            searchForBooks(query, searchType);
            setSearchValue(query);
        }
    }, [query]);

    const searchForBooks = async (searchQuery, type) => {
        setBooks([]);
        console.log(`Search by ${type}: ${searchQuery}`);

        let apiUrl;

        if (type === "both") {
            apiUrl = `https://openlibrary.org/search.json?q=${searchQuery}`;
        } else {
            apiUrl = `https://openlibrary.org/search.json?${type}=${searchQuery}`;
        }

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const booksData = data.docs.map((doc) => ({
                author: doc.author_name ? doc.author_name[0] : "Unknown",
                title: doc.title,
                coverI: doc.cover_i,
            }));

            const booksWithCovers = booksData.filter((book) => book.coverI);

            setBooks(booksWithCovers);
            setIsLoading(false);
        } catch (err) {
            console.error("Failed to fetch data:", err);
        }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      setIsLoading(true);
      navigate(`/search/${inputValue}`);
        setSearchValue(inputValue);
        console.log("search value", searchValue);
        console.log("Returned books", books);
    };

    return (
        <section className="display landing d-flex flex-column align-items-center w-100">
            <form onSubmit={handleSubmit} className="d-flex flex-column w-50">
                <h1 className="my-4">Search</h1>
                <input
                    className="search-input fs-4 fw-normal px-4 py-1 rounded"
                    type="search"
                    placeholder="search books..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <div className="d-flex my-2">
                    <input
                        type="radio"
                        id="author"
                        name="search-type"
                        checked={searchType === "author"}
                        onChange={() => setSearchType("author")}
                    />
                    <label htmlFor="author" className="px-4 fs-5 text-muted">
                        author
                    </label>
                    <input
                        type="radio"
                        id="title"
                        name="search-type"
                        checked={searchType === "title"}
                        onChange={() => setSearchType("title")}
                    />
                    <label htmlFor="title" className="px-4 fs-5 text-muted">
                        title
                    </label>
                    <input
                        type="radio"
                        id="both"
                        name="search-type"
                        checked={searchType === "both"}
                        onChange={() => setSearchType("both")}
                    />
                    <label htmlFor="both" className="px-4 fs-5 text-muted">
                        both
                    </label>
                </div>
                <div className="d-flex justify-content-end">
                    <button className="search-button">search</button>
                </div>
            </form>
            {isLoading && <LoadingSpinner />}
        {books && <SearchDisplay books={books} searchValue={searchValue} isLoading={isLoading} />}
        </section>
    );
};

export default Search;
