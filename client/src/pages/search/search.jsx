import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./search.css";
import BookMenu from "../../components/BookMenu";

const Search = () => {
    let { query } = useParams();
    const [searchType, setSearchType] = useState("both");
    const [inputValue, setInputValue] = useState(query || "");
    const [searchValue, setSearchValue] = useState("");
    const [books, setBooks] = useState([]);

    useEffect(() => {
        if (query) {
            searchForBooks(query, searchType);
            setSearchValue(query);
        }
    }, [query, inputValue]);

    const searchForBooks = async (searchQuery, type) => {
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
        } catch (err) {
            console.error("Failed to fetch data:", err);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchValue(inputValue);
        searchForBooks(inputValue, searchType);
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

            {books && (
                <>
                    <div className="d-flex w-100 mt-4">
                        {searchValue && (
                            <h2 className="mx-auto w-50 fw-normal search-display font-italic fst-italic">
                                {searchValue}...
                            </h2>
                        )}
                    </div>
                    <div className="d-flex flex-column align-items-center w-100">
                        {books.map((book, index) => (
                            <div className="d-flex w-50 py-4">
                                <div key={index}>
                                    <img
                                        src={`http://covers.openlibrary.org/b/id/${book.coverI}-M.jpg`}
                                        alt={`${book.title} cover`}
                                    />
                                </div>
                                <div className="px-5 text-italic">
                                    <h2 className="fst-italic">{book.title}</h2>
                                    <h4>by {book.author}</h4>
                                    <BookMenu />
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </section>
    );
};

export default Search;
