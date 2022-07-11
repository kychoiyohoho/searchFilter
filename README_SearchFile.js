
import React, { useState } from "react";
import Header from "components/Header";
import CountriesList from "resources/data/countries-list.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo } from "react";
import ExternalInfo from "components/ExternalInfo";
const SearchFilter = () => {
    //useState 로 첫 search 값은 빈값이다
    const [search, setSearch] = useState("");
//useMemo 로 search 랑 CountryesList 만 바뀐때 counties 가 재 래던링 발생하게 해서 속도의 최적화 했다
    const countries = useMemo(() => {
        if (!search) return CountriesList; //false ,undefined 라면 CountriesList 
        return CountriesList.filter((country) => {
            return (
                country.name.toLowerCase().includes(search.toLowerCase()) ||
                country.region.toLowerCase().includes(search.toLowerCase())
            );
        });
    }, [search, CountriesList]);//input 의 값이 바뀌면 search가 변해서 재랜더링 발생
    return (
        <>
            <Header title="Country Search (Using useMemo)" />
            <ExternalInfo page="searchFilter" />
            <div className="row justify-content-center mt-4">
                <div className="col-lg-6 text-center">
                    <div className="row">
                        <div className="col-12">
                            <div className="input-group mb-3">
                                <div className="input-group-append">
                                    <span
                                        className="input-group-text"
                                        id="basic-addon1"
                                    >
                                        <FontAwesomeIcon icon="search" />
                                    </span>
                                </div>
                                {/* 검색에 사용할 input 박스, 기본값은 search 변수를 받아 null 인데, 변화가 있을시 setSearch로 값을 setSearch에 전달한다.  */}
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search Country"
                                    aria-label="Search"
                                    aria-describedby="basic-addon1"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-12">
                            <ul className="list-group text-left">
                                {countries.map((country, idx) => (
                                    <CountryListItem {...country} key={idx} />
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
const CountryListItem = ({ name, flag, region }) => {
    return (
        <li className="list-group-item d-flex">
            <div className="d-inline">
                <img src={flag} style={{ width: "60px" }} />
            </div>
            <div className="col pt-2">
                {name} <span className="badge badge-info">{region}</span>
            </div>
        </li>
    );
};
export default SearchFilter;


$$$$$

전체데이터: 

import CountriesList from "resources/data/countries-list.json";

(!search) 이면 전체 데이터를 리턴해서 contries.map 으로 데이터를 호출한다.

Search 박스에서 검색을 시작하면 input 태그에 onChange가 setSearch 에 들어가서 e.target.value 로 search에 값을 넣는다.

그럼 useMemo 에서 dependencies 가 search 때문에 바껴 재랜더링이 발생한다.
Search 는 이제 값이 있어서 CountriesList.filter 로 모든 데이터의 이름과 지역을 lowercase 로 하고 search 가 포함되어 있는지 찾아서 countries 에 담아 화면에 보여준다.

CountryListItem 이라는 컴포넌트를 밑에 만들었는데, 이름 깃발 지역을 받는다

{name} 으로 이름이 출력된다.
