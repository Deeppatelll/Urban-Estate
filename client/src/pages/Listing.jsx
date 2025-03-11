import { useEffect, useState } from 'react';
import { useParams,Link} from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
  FaDownload,
} from 'react-icons/fa';
import Contact from '../components/Contact';
import { jsPDF } from 'jspdf';  // Import jsPDF

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    let isMounted = true; // Prevent state updates on unmounted component
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          if (isMounted) {
            setError(true);
            setLoading(false);
          }
          return;
        }
        if (isMounted) {
          setListing(data);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        console.error('Error fetching listing:', error);
        if (isMounted) {
          setError(true);
          setLoading(false);
        }
      }
    };
    fetchListing();
    return () => {
      isMounted = false; // Cleanup to avoid memory leaks
    };
  }, [params.listingId]);

  const addToFavourites = async () => {
    try {
      if (!currentUser) {
        alert("You need to be logged in to add to favourites.");
        return;
      }
  
      const res = await fetch(`/api/user/addtofav/${params.listingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`, // Ensure the token is sent
        },
      });
  
      const data = await res.json();
      if (res.ok) {
        alert("Added to favourites successfully!");
      } else {
        alert(data.message || "Failed to add to favourites.");
      }
    } catch (error) {
      console.error("Error adding to favourites:", error);
      alert("Something went wrong.");
    }
  };
  

  // Function to generate PDF
  const generatePDF = async () => {
    const doc = new jsPDF();
    const imgWidth = 180;  // Width of the image in PDF
    const imgX = 10;  // X position for images
    let yPosition = 10;  // Starting Y position for images

    // Loop through images and add them to PDF
    for (const url of listing.imageUrls) {
      // Create an image element
      const img = new Image();
      img.src = url;

      // Wait for the image to load before adding to the PDF
      img.onload = function () {
        // Calculate image height while maintaining the aspect ratio
        const aspectRatio = img.width / img.height;
        const imgHeight = imgWidth / aspectRatio;

        // Add image to PDF with proper dimensions
        doc.addImage(url, 'JPEG', imgX, yPosition, imgWidth, imgHeight);
        yPosition += imgHeight + 10;  // Add spacing after each image

        // After images, add details
        if (yPosition >= 250) {  // Check if space is running out, add new page
          doc.addPage();
          yPosition = 10; // Reset Y position for the new page
        }

        // After the last image, add property details
        if (listing.imageUrls.indexOf(url) === listing.imageUrls.length - 1) {
          // Add property details below images
          yPosition += 10;  // Space between images and details

          // Set font size and color for details
          doc.setFontSize(10);
          doc.setTextColor(0, 0, 0);

          // Add property details: Name, Price, Location, and Description
          doc.text(`Property Name: ${listing.name}`, imgX, yPosition);
          yPosition += 6;

          doc.text(`Price: ₹${listing.offer ? listing.discountPrice.toLocaleString('en-IN') : listing.regularPrice.toLocaleString('en-IN')}`, imgX, yPosition);
          yPosition += 6;

          doc.text(`Location: ${listing.address}`, imgX, yPosition);
          yPosition += 6;

          doc.text(`Description: ${listing.description}`, imgX, yPosition);
          yPosition += 6;

          // Save the PDF after details
          doc.save(`${listing.name}-brochure.pdf`);
        }
      };
    }
  };

  return (
    <main>
       {/* 🔹 This section shows on small screens only */}
       <div className="sm:hidden flex justify-between bg-gray-100 py-3 px-4 shadow-md">
        <Link to="/" className="text-gray-700 font-medium">Home</Link>
        <Link to="/about" className="text-gray-700 font-medium">About</Link>
        <Link to="/profile" className="text-gray-700 font-medium">Profile</Link>
      </div>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && <p className="text-center my-7 text-2xl">Something went wrong!</p>}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div className="w-full h-[550px] bg-gray-100 flex justify-center items-center">
                  <img
                    src={url}
                    alt="Property"
                    className="max-w-full max-h-full object-cover rounded-md"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 bg-slate-100 p-2 rounded-md transition-opacity duration-500">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name} - ₹{' '}
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-IN')
                : listing.regularPrice.toLocaleString('en-IN')}
              {listing.type === 'rent' && ' / month'}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ₹{(+listing.regularPrice - +listing.discountPrice).toLocaleString('en-IN')} OFF
                </p>
              )}
  
              {/* ✅ Moved "Add to Favourite" button to the yellow area without removing anything */}
              {currentUser && listing.userRef !== currentUser._id && (
                <button
                  onClick={addToFavourites}
                  className="bg-yellow-500 text-white w-full max-w-[200px] text-center p-1 rounded-md"
                >
                  ❤️ Add to Favourite
                </button>
              )}
            </div>
  
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {listing.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds`
                  : `${listing.bedrooms} bed`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths`
                  : `${listing.bathrooms} bath`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaParking className="text-lg" />
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaChair className="text-lg" />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
  
            {!contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3 mt-6"
              >
                Contact Developer
              </button>
            )}
  
            {contact && <Contact listing={listing} />}
  
            {/* Download Brochure Button */}
            <button
  onClick={generatePDF}
  className="bg-blue-600 text-white rounded-lg uppercase hover:opacity-95 p-3 mt-6 flex justify-center items-center gap-2 w-full text-center"
>
  <div className="flex items-center justify-center gap-2">
    <FaDownload className="text-lg" />
    <span>Download Brochure</span>
  </div>
</button>

          </div>
        </div>
      )}
    </main>
  );
}  
