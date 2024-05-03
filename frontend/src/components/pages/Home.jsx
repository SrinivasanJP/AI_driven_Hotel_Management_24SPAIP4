import React, { useState } from 'react';
import Navigation from '../Navigation';
import bg from '../../assets/bg.avif';

const Home = ({ setPage }) => {
  return (
    <div id="home" className="">
      <Navigation setPage={setPage} />
      <div
        className="bg-cover bg-center w-screen h-screen flex items-center"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          objectFit: 'cover', // Ensures the image is cropped while covering the entire element
        }}
      >
        <div className=' backdrop-blur-xl p-10 text-white w-[80%] lg:w-[50%] rounded-r-xl'>
          <p>An online restaurant booking site serves as a digital gateway for gastronomic exploration, providing an array of features tailored to enhance the dining experience. From the comfort of their screens, users embark on culinary adventures, navigating through an extensive selection of restaurants meticulously categorized by cuisine, location, or dining preferences. With sleek and intuitive interfaces, these platforms facilitate seamless navigation, granting users instant access to comprehensive restaurant details, tantalizing menus, and real-time availability.

Moreover, the integration of secure payment systems ensures swift and hassle-free reservation confirmations, instilling confidence and peace of mind among users. Embracing the ethos of user-centric design, these platforms often showcase a treasure trove of authentic user reviews and ratings, empowering diners to make well-informed decisions and embark on delightful culinary discoveries. 

In essence, online restaurant booking sites redefine the dining landscape, offering unparalleled convenience, accessibility, and enjoyment to food enthusiasts worldwide.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
