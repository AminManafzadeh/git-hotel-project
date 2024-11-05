import { IoLocationOutline } from "react-icons/io5";
import { BsCalendar2Date } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { useRef, useState } from "react";
import useOutsideClick from "../Hooks/useOutsideClick";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { format } from "date-fns";
import { createSearchParams, Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { IoIosLogOut } from "react-icons/io";



function Header() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [destination, setDestination] = useState(searchParams.get("destination") || "")
    const [openOptions, setOpenOptions] = useState(false)
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    })
    const [date, setDate] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }])
    const [openDate, setOpenDate] = useState(false)

    const navigate = useNavigate()


    const handleOptions = (name, operation) => {
        setOptions(prev => {
            return {
                ...prev,
                [name]: operation === "inc" ? options[name] + 1 : options[name] - 1
            }
        })
    }

    const handleSearch = () => {
        const encodedParams = createSearchParams({
            destination,
            date: JSON.stringify(date),
            options: JSON.stringify(options)
        })
        // setSearchParams(encodedParams)

        navigate({
            pathname: "/hotels",
            search: encodedParams.toString()
        })
    }


    return (
        <div className='flex items-center justify-between gap-4 max-w-[1280px] mx-auto  '>
            <NavLink to="/bookmark">Bookmarks</NavLink>
            <div className='flex items-center justify-between w-full max-w-[900px] gap-4 border border-solid border-[#ebe9e9] rounded-3xl p-4'>
                <div className="flex items-center relative">
                    <IoLocationOutline className="w-6 h-6 inline-block -text--rose-500" />
                    <input
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        type="text"
                        className="py-3 px-2"
                        id="destination"
                        name="destination"
                        placeholder="where to go?"
                    />
                    <span className="seperator"></span>
                </div>

                <div className="flex items-center relative">
                    <BsCalendar2Date className="w-6 h-6 inline-block -text--primary-700" />
                    <div onClick={() => setOpenDate(!openDate)} className="ml-2">
                        {`${format(date[0].startDate, "MM,dd,yyyy")} to ${format(date[0].endDate, "MM,dd,yyyy")}`}
                    </div>
                    {openDate && <DateRange
                        className="absolute top-[50px] left-[-5rem] z-[1000000000000]"
                        ranges={date}
                        onChange={(item) => setDate([item.selection])}
                        minDate={new Date()}
                        moveRangeOnFirstSelection={true}
                    />}
                    <span className="seperator"></span>
                </div>

                <div className="flex items-center relative justify-between">
                    <div id="optionDropDown" onClick={() => setOpenOptions(!openOptions)}> {options.adult} adult &bull; {options.children} children &bull; {options.room} room</div>
                    {openOptions && <GuestOptionsList
                        options={options}
                        setOptions={setOptions}
                        handleOptions={handleOptions}
                        setOpenOptions={setOpenOptions}
                    />}
                    <span className="seperator"></span>
                </div>

                <div className="flex items-center relative">
                    <button onClick={handleSearch} className="flex items-center justify-center -bg--primary-600 text-white p-2 rounded-2xl">
                        <BsSearch className="w-6 h-6 inline-block" />
                    </button>
                </div>
            </div>
            <User />
        </div>
    )
}

export default Header


function GuestOptionsList({ options, handleOptions, setOpenOptions }) {
    const optionsRef = useRef()
    useOutsideClick(optionsRef, "optionDropDown", () => setOpenOptions(false))

    const optionsInfo = [
        {
            type: "adult",
            minLimit: 1,
            id: 1
        },
        {
            type: "children",
            minLimit: 0,
            id: 2
        },
        {
            type: "room",
            minLimit: 1,
            id: 3
        }
    ]

    return (
        <div ref={optionsRef} className="bg-white shadow-md rounded-2xl p-4 border border-solid -border--text-100 absolute top-12 right-[-40px] w-56 z-50 space-y-2">
            {
                optionsInfo.map(item => {
                    return (
                        <OptionItem
                            key={item.id}
                            options={options}
                            minLimit={item.minLimit}
                            type={item.type}
                            handleOptions={handleOptions}
                        />
                    )
                })
            }
        </div>
    )
}


function OptionItem({ options, type, minLimit, handleOptions }) {
    return (
        <div className="flex items-center justify-between gap-4">
            <span className="inline-block flex-1 text-sm font-medium">{type}</span>
            <div className="flex items-center gap-4">
                <button
                    className="p-2 inline-block rounded-lg -text--text-700 -bg--text-100"
                    disabled={options[type] <= minLimit}
                    onClick={() => handleOptions(type, "dec")}
                >
                    <FaMinus className="w-3 h-3" />
                </button>
                <span className="inline-block font-bold ">{options[type]}</span>
                <button
                    className="p-2 inline-block rounded-lg -text--text-700 -bg--text-100"
                    onClick={() => handleOptions(type, "inc")}
                >
                    <FaPlus className="w-3 h-3" />
                </button>
            </div>
        </div>
    )
}


function User() {
    const { user, isAuthentication, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    return (
        <div>
            {isAuthentication ?
                <div className="flex items-center">
                    <span>{user.name}</span>
                    <button onClick={handleLogout}>
                        <IoIosLogOut className="w-6 h-6 -text--text-500 hover:-text--rose-500" />
                    </button>
                </div>
                : <NavLink to="/login">Login</NavLink>}
        </div>
    )
}