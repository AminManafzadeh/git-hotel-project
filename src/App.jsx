
import { Toaster } from 'react-hot-toast'
import './App.css'
import LocationList from './componenets/LocationList'
import { Route, Routes } from 'react-router-dom'
import AppLayout from './componenets/AppLayout'
import Hotels from './componenets/Hotels'
import SingleHotel from './componenets/SingleHotel'
import HotelProvider from './context/HotelProvider'
import Layout from './componenets/Layout'
import BookmarkLayout from './componenets/BookmarkLayout'
import Bookmarks from './componenets/Bookmarks'
import BookmarkProvider from './context/BookmarkProvider'
import SingleBookmark from './componenets/SingleBookmark'
import AddNewBookmark from './componenets/AddNewBookmark'
import AuthProvider from './context/AuthProvider'
import Login from './componenets/Login'
import ProtectedRoute from './componenets/ProtectedRoute'

function App() {


  return (
    <AuthProvider>
      <HotelProvider>
        <BookmarkProvider>
          <div className='container m-auto my-8'>
            <Toaster />
            <Routes>
              <Route path='' element={<Layout />}>
                <Route path='/' element={<LocationList />} />
                <Route path='/login' element={<Login />} />
                <Route path='/hotels' element={<AppLayout />}>
                  <Route index element={<Hotels />} />
                  <Route path=':id' element={<SingleHotel />} />
                </Route>
                <Route path='/bookmark' element={<ProtectedRoute><BookmarkLayout /></ProtectedRoute>} >
                  <Route index element={<Bookmarks />} />
                  <Route path=':id' element={<SingleBookmark />} />
                  <Route path='add' element={<AddNewBookmark />} />
                </Route>
              </Route>
            </Routes>
          </div>
        </BookmarkProvider>
      </HotelProvider>
    </AuthProvider>
  )
}

export default App
