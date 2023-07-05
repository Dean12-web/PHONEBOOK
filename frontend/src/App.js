import './App.css';
import { BrowserRouter as Router, Outlet, Route, Routes, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from 'react';
import axios from "axios"
import PhoneBox from './components/PhoneBox';
import PhoneForm from './components/PhoneForm';


function Layout({ handleSearch, searchQuery, sortBy,onSortChange }) {
    const navigate = useNavigate()
    const handleChange = (e) => {
        handleSearch(e.target.value)
    }
    return (
        <div className='container'>
            <header>
                <div className="flex-container">
                    <div className="flex-item">
                        <button
                            className="btn btn-brown float-end me-3"
                            onClick={() => onSortChange(sortBy)}>
                            <span className="fa-solid fa-arrow-up-z-a text-black"></span>
                        </button>
                    </div>
                    <div className="flex-item input-wrapper">
                        <div className="input-icons mt-1">
                            <i className="fa fa-magnifying-glass icon"></i>
                            <input
                                type="text"
                                className="form-control input-field"
                                value={searchQuery}
                                onChange={handleChange}
                                placeholder='Search'
                            />
                        </div>
                    </div>
                    <div className="flex-item">
                        <button className="btn btn-brown ms-3" onClick={() => navigate('add')}>
                            <span className="fa-solid fa-user-plus text-black"></span>
                        </button>
                    </div>
                </div>
            </header>
            <Outlet />
        </div>
    )
}

function NotFound() {
    return (
        <h1>Page Not Found</h1>
    )
}

function App() {
    const [data, setData] = useState([])
    const [refreshFlag, setRefreshFlag] = useState(false); //Handling For Update Data, make the data refreshed manually when update
    const [page, setPage] = useState(1)
    const [prevPage, setPrevPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const [sortBy, setSortBy] = useState('name')
    const [sortMode, setSortMode] = useState('desc')
    const [searchQuery, setSearchQuery] = useState('')
    const containerRef = useRef(null)

    useEffect(() => {
        const fetchData = () => {
            axios.get(`http://localhost:3001/api/phonebooks?page=${page}`, {
                params: {
                    sortBy,
                    sortMode,
                    name: searchQuery // Pass search query as parameter
                }
            }).then((response) => {
                if (!response.data.data.success) {
                    setIsLoading(true)
                    return
                }
                setPrevPage(page)
                setData([...data, ...response.data.data.phonebooks]);
                const pages = response.data.data.pages
                if (page >= pages) {
                    setIsLoading(true)
                    return
                }
            }).catch(() => {
                setData([])
                setIsLoading(false)
            })
        };

        if (!isLoading && prevPage !== page) {
            fetchData();
        }
    }, [refreshFlag, page, isLoading, prevPage, data, sortBy, sortMode, searchQuery]);

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 5) {
                setPage((prevPage) => prevPage + 1);
            }
        };

        const containerElement = containerRef.current;
        if (containerElement) {
            containerElement.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (containerElement) {
                containerElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, [refreshFlag, containerRef]);

    const handleSearch = (query) => {
        setSearchQuery(query)
        setPage(1) // Reset page number when searching
        setPrevPage(0)
        setData([])
        setIsLoading(false)
    }

    const handleSortChange = (field) => {
        if (field === sortBy) {
            setSortMode(sortMode === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(field)
            setSortMode('asc')
        }
        setPage(1)
        setPrevPage(0)
        setData([])
        setIsLoading(false)
    }

    const addUser = (name, phone) => {
        const id = parseInt(Date.now())
        console.log(id)
        setData([{ id, name, phone, sent: true }, ...data])
        axios.post(`http://localhost:3001/api/phonebooks`, { name, phone }).then((response) => {
            setData(currentData => currentData.map(item => {
                if (item.id === id) {
                    item.id = response.data.data.users.id
                }
                return item
            }))
            setRefreshFlag((prevFlag) => !prevFlag); // Toggle the refresh flag
        }).catch(() => {
            setData(currentData => currentData.map(item => {
                if (item.id === id) {
                    item.sent = false
                }
                return item
            }))
        })
    }

    const updateUser = (id, name, phone) => {
        axios.put(`http://localhost:3001/api/phonebooks/${id}`, { name, phone }).then((response) => {
            setData(currentData => currentData.map(item => {
                if (item.id === id) {
                    item.name = name
                    item.phone = phone
                }
                return item
            }))
            setRefreshFlag((prevFlag) => !prevFlag); // Toggle the refresh flag
        }).catch(() => {
            alert('Update Gagal')
        })
    }

    const removeUser = (id) => {
        axios.delete(`http://localhost:3001/api/phonebooks/${id}`).then((response) => {
            setData(data.filter(item => item.id !== id))
        }).catch(() => {
            alert('Hapus Gagal')
        })
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout
                    handleSearch={handleSearch}
                    searchQuery={searchQuery}
                    sortBy={sortBy}
                    sortMode={sortMode}
                    onSortChange={handleSortChange}
                />}>
                    <Route index element={<PhoneBox
                        data={data}
                        updateUser={updateUser}
                        removeUser={removeUser}
                        containerRef={containerRef}
                        isLoading={isLoading} />} />
                    <Route path="add" element={<PhoneForm add={addUser} />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
