import React from "react";
import FilterButton from "./FilterButton";

export default function FuzzySearchDisplay(props) {
    const [removeFilter, handleInput, searchQuery, handleSubmit] = props.functions;
    return (
        <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="searchBar">
                {searchQuery.filters.map((eachFilter, index) => {
                    return (
                        <FilterButton
                            key={index}
                            text={eachFilter}
                            index={index}
                            onClick={() => {
                                removeFilter(index, "filters");
                            }}
                        />
                    );
                })}

                {searchQuery.optionalFilter.map((eachFilter, index) => {
                    return (
                        <FilterButton
                            key={index}
                            text={eachFilter}
                            index={index}
                            onClick={() => {
                                removeFilter(index, "optionalFilter");
                            }}
                        />
                    );
                })}

                <input
                    type="text"
                    name="search"
                    placeholder="Search for people, conversations, files..."
                    value={searchQuery.search}
                    onChangeCapture={handleInput}
                    onChange={() => {
                        return 0;
                    }}
                    // todo ask team if ok to leave in code or see alternative way of adding key capture
                />
            </div>
        </form>
    );
}
