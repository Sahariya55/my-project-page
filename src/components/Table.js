import axios from "axios"
import React from 'react'
import { useState, useEffect } from 'react'
import NavBar from "./NavBar"

function Table() {
    const [data, setData] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [filterId, setFilterId] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    useEffect(() => {
        axios.get('http://localhost:3031/item')
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [])

    const handleSearch = event => {
        setSearchTerm(event.target.value)
        setCurrentPage(1)
    }

    const handleFilter = event => {
        setFilterId(event.target.value)
        setCurrentPage(1)
    }

    const filteredData = data.filter(item => {
        const searchTermLower = searchTerm.toLowerCase()
        const filterIdInt = parseInt(filterId)
        return item.name.toLowerCase().includes(searchTermLower) && (isNaN(filterIdInt) || item.id === filterIdInt)
    })

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)

    const totalPages = Math.ceil(filteredData.length / itemsPerPage)

    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
    }

    return (
        <>
            <div className="container mt-5">
                <NavBar />
                <div className="mb-3 shadow p-3 mb-5 bg-body-tertiary rounded">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by project name"
                        value={searchTerm}
                        onChange={handleSearch}

                    />
                    
                    
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Filter by project ID"
                        value={filterId}
                        onChange={handleFilter}

                    />

                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>PROJECT NAME</th>
                            <th>LAST UPDATE</th>
                            <th>RESOURCES</th>
                            <th>TIMELINE</th>
                            <th>ESTIMATION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, idx) => {
                            return <tr key={idx}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.update}</td>
                                <td>{item.resources}</td>
                                <td>{item.timeline}</td>
                                <td>{item.estimation}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
                <nav>
                    <ul className="pagination">
                        {pageNumbers.map(number => {
                            return (
                                <li key={number} className="page-item">
                                    <button onClick={() => setCurrentPage(number)} className="page-link">
                                        {number}
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </div>
        </>
    )
}
export default Table;








