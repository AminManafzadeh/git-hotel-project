import { createContext, useContext, useEffect, useReducer } from "react"
import axios from "axios"
import toast from "react-hot-toast"

const BookmarkContext = createContext()


const initialState = {
    currBookmark: null,
    isLoading: false,
    bookmarks: [],
    error: null
}

function bookmarkReucer(state, { type, payload }) {
    switch (type) {
        case "loading": {
            return {
                ...state,
                isLoading: true
            }
        }
        case "bookmarks/loaded": {
            return {
                ...state,
                isLoading: false,
                bookmarks: payload
            }
        }
        case "bookmark/loaded": {
            return {
                ...state,
                isLoading: false,
                currBookmark: payload
            }
        }
        case "bookmark/created": {
            return {
                ...state,
                isLoading: false,
                currBookmark: payload,
                bookmarks: [...state.bookmarks, payload]
            }
        }
        case "bookmarks/deleted": {
            return {
                ...state,
                isLoading: false,
                currBookmark: null,
                bookmarks: state.bookmarks.filter(item => item?.id !== payload)
            }
        }
        case "rejected": {
            return { ...state, isLoading: false, error: payload }
        }
        default:
            throw new Error("Unknown action")
    }
}

function BookmarkProvider({ children }) {
    // const [currBookmark, setCurrBookmark] = useState(null)
    // const [bookmarks, setBookmarks] = useState([])
    // const [isLoading, setIsLoading] = useState(false)

    const [{ currBookmark, isLoading, bookmarks }, dispatch] = useReducer(bookmarkReucer, initialState)

    useEffect(() => {
        async function fetchBookmarksList() {
            dispatch({ type: "loading" })
            try {
                const { data } = await axios.get("http://localhost:5000/bookmarks")
                dispatch({ type: "bookmarks/loaded", payload: data })
                console.log(data)
            } catch (error) {
                toast.error(error?.message)
                dispatch({ type: "rejected", payload: "an Error accurred in Loading Bookmarks" })
            }
        }

        fetchBookmarksList()
    }, [])

    async function getBookmark(id) {
        if (Number(id) === currBookmark?.id) return

        dispatch({ type: "loading" })
        try {
            const { data } = await axios.get(`http://localhost:5000/bookmarks/${id}`)
            dispatch({ type: "bookmark/loaded", payload: data })
        } catch (error) {
            toast.error(error?.message)
            dispatch({ type: "rejected", payload: "n Error accurred in Loading Single Bookmark" })
        }
    }

    async function deleteBookmark(id) {
        dispatch({ type: "loading" })
        try {
            await axios.delete(`http://localhost:5000/bookmarks/${id}`)
            dispatch({ type: "bookmarks/deleted", payload: id })
        } catch (error) {
            toast.error(error?.message)
            dispatch({ type: "rejected", payload: "an Error accurred in deleted Bookmark" })
        }
    }

    async function createBookmark(newBookmark) {
        dispatch({ type: "loading" })
        try {
            const { data } = await axios.post("http://localhost:5000/bookmarks", newBookmark)
            dispatch({ type: "bookmark/created", payload: data })
            console.log(data)
        } catch (error) {
            toast.error(error?.message)
            dispatch({ type: "rejected", payload: "n Error accurred in creatting Bookmark" })
        }
    }

    return (
        <BookmarkContext.Provider value={{ bookmarks, deleteBookmark, isLoading, getBookmark, currBookmark, createBookmark }}>
            {children}
        </BookmarkContext.Provider>
    )
}

export default BookmarkProvider


export function useBookmark() {
    return useContext(BookmarkContext)
}