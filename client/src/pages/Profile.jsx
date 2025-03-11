import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaList, FaHeart } from "react-icons/fa";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [userFavsListings,setUserFavsListings] = useState([]);
  const dispatch = useDispatch();

  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };
  const handleShowFavs = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/getfavs/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserFavsListings(data.favourites);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
      <div className='p-3 max-w-lg mx-auto'>
      {/* 🔹 This section shows on small screens only */}
       {/* 🔹 This section shows on small screens only */}
       <div className="sm:hidden flex justify-between bg-gray-100 py-3 px-4 shadow-md">
        <Link to="/" className="text-gray-700 font-medium">Home</Link>
        <Link to="/about" className="text-gray-700 font-medium">About</Link>
        <Link to="/profile" className="text-gray-700 font-medium">Profile</Link>
      </div>


        <h1 className='text-2xl font-semibold text-center my-5'>Profile</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type='file'
            ref={fileRef}
            hidden
            accept='image/*'
          />
          <img
            onClick={() => fileRef.current.click()}
            src={formData.avatar || currentUser.avatar}
            alt='profile'
            className='rounded-full h-20 w-20 object-cover cursor-pointer self-center mt-2 border-2 border-gray-300'
          />
          <p className='text-sm text-center text-gray-600'>
            {fileUploadError ? (
              <span className='text-red-700'>
                Error: Image must be less than 2MB
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className='text-green-700'>Image uploaded successfully!</span>
            ) : (
              ''
            )}
          </p>
          <input
            type='text'
            placeholder='Username'
            defaultValue={currentUser.username}
            id='username'
            className='border p-2 rounded-lg text-sm'
            onChange={handleChange}
          />
          <input
            type='email'
            placeholder='Email'
            id='email'
            defaultValue={currentUser.email}
            className='border p-2 rounded-lg text-sm'
            onChange={handleChange}
          />
          <input
            type='password'
            placeholder='Password'
            onChange={handleChange}
            id='password'
            className='border p-2 rounded-lg text-sm'
          />
          <button
            disabled={loading}
            className='bg-slate-700 text-white rounded-lg p-2 uppercase text-sm hover:opacity-90 disabled:opacity-80'
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
          <Link
            className='bg-green-700 text-white p-2 rounded-lg uppercase text-center text-sm hover:opacity-90'
            to={'/create-listing'}
          >
            Create Listing
          </Link>
        </form>
  
        <div className='flex justify-between mt-3 text-sm'>
          <span
            onClick={handleDeleteUser}
            className='text-red-700 cursor-pointer'
          >
            Delete Account
          </span>
          <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
            Sign Out
          </span>
        </div>
  
        <p className='text-red-700 mt-3'>{error ? error : ''}</p>
        <p className='text-green-700 mt-3'>
          {updateSuccess ? 'User updated successfully!' : ''}
        </p>
  
        {/* Smaller & Stylish Buttons */}
        <div className="flex flex-col gap-2 mt-4">
          <button
            onClick={handleShowListings}
            className="bg-blue-600 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 text-sm font-medium hover:bg-blue-700 transition duration-300"
          >
            <FaList className="text-md" />
            Show Listings
          </button>
  
          <button
            onClick={handleShowFavs}
            className="bg-red-400 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 text-sm font-medium hover:bg-yellow-600 transition duration-300"
          >
            <FaHeart className="text-md" />
            Show Favourites
          </button>
        </div>
  
        <p className='text-red-700 mt-3'>
          {showListingsError ? 'Error showing listings' : ''}
        </p>
  
        {userListings && userListings.length > 0 && (
          <div className='flex flex-col gap-3 mt-5'>
            <h1 className='text-center text-lg font-semibold'>Your Listings</h1>
            {userListings.map((listing) => (
              <div
                key={listing._id}
                className='border rounded-lg p-2 flex justify-between items-center gap-3 text-sm'
              >
                <Link to={`/listing/${listing._id}`}>
                  <img
                    src={listing.imageUrls[0]}
                    alt='listing cover'
                    className='h-12 w-12 object-cover rounded-md'
                  />
                </Link>
                <Link
                  className='text-slate-700 font-medium hover:underline truncate flex-1'
                  to={`/listing/${listing._id}`}
                >
                  <p>{listing.name}</p>
                </Link>
  
                <div className='flex flex-col items-center'>
                  <button
                    onClick={() => handleListingDelete(listing._id)}
                    className='text-red-600 text-xs'
                  >
                    Delete
                  </button>
                  <Link to={`/update-listing/${listing._id}`}>
                    <button className='text-green-600 text-xs'>Edit</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
  
        {userFavsListings && userFavsListings.length > 0 && (
          <div className='flex flex-col gap-3 mt-5'>
            <h1 className='text-center text-lg font-semibold'>Your Favourites</h1>
            {userFavsListings.map((listing) => (
              <div
                key={listing._id}
                className='border rounded-lg p-2 flex justify-between items-center gap-3 text-sm'
              >
                <Link to={`/listing/${listing._id}`}>
                  <img
                    src={listing.imageUrls[0]}
                    alt='listing cover'
                    className='h-12 w-12 object-cover rounded-md'
                  />
                </Link>
                <Link
                  className='text-slate-700 font-medium hover:underline truncate flex-1'
                  to={`/listing/${listing._id}`}
                >
                  <p>{listing.name}</p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
  );
}  






