import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import bgImage from '../imagess/s3.jpg'; 

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* Hero Section with Background */}
    <div
  className="relative flex flex-col items-start gap-6 px-3 py-24 sm:py-32 md:py-40 text-white w-full"
  style={{
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100vw",  // Makes it take full width
    height: "auto",  // Keeps original height
  }}
>
  <h1 className="text-white font-bold text-3xl sm:text-5xl md:text-6xl leading-tight">
    Find your next <span className="text-gray-300">perfect</span> <br />
    place with ease
  </h1>
  <p className="text-gray-200 text-sm sm:text-base max-w-xl">
    Urban Estate is the best place to find your next perfect place to live. 
    We have a wide range of properties for you to choose from.
  </p>

  {/* Styled Button */}
  <Link
    to={'/search'}
    className="bg-blue-600 text-white px-5 py-3 rounded-lg text-sm sm:text-base font-bold transition-all duration-300 hover:bg-blue-800 hover:shadow-lg hover:scale-105"
  >
    Let's Get Started →
  </Link>
</div>


      {/* Listing Results for Offer, Sale, and Rent */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings.length > 0 && (
          <div>
            <h2 className='text-2xl font-semibold text-slate-600'>Recent Offers</h2>
            <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>
              Show more offers
            </Link>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {rentListings.length > 0 && (
          <div>
            <h2 className='text-2xl font-semibold text-slate-600'>Recent Places for Rent</h2>
            <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>
              Show more places for rent
            </Link>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {saleListings.length > 0 && (
          <div>
            <h2 className='text-2xl font-semibold text-slate-600'>Recent Places for Sale</h2>
            <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>
              Show more places for sale
            </Link>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

