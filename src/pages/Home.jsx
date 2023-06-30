import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LoginBg from './login-bg.png';
import Hero from './hero.png';

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <main className="h-screen w-full bg-hero-pattern-blue bg-cover flex justify-center items-center relative">
      <div className="content-hero h-[100px] w-[100px] absolute top-5 left-20" />
      <div className="absolute top-10 right-20">
        <button
          onClick={handleLoginClick}
          className="text-sm font-semibold leading-6 text-white cursor-pointer focus:outline-none"
        >
          Log in <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
      <div className="w-5/6 flex-col flex items-center justify-center ">
        <div className="flex flex-col items-center justify-around">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            variants={{
              hidden: {
                opacity: 0,
                x: -50,
              },
              visible: {
                opacity: 1,
                x: 0,
              },
            }}
            className="flex flex-col items-center justify-around"
          >
            <h1 className="text-center text-2xl font-medium md:text-7xl sm:text-4xl text-white mb-5 ">
              USSD Code Application Platform
            </h1>
            <p className="text-center text-sm sm:text-xl md:text-2xl max-w-4xl text-white mb-5">
              Unlock the Power of USSD with Personalized Codes Apply, Activate, and Connect
              with Ease!
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            variants={{
              hidden: {
                opacity: 0,
                y: 50,
              },
              visible: {
                opacity: 1,
                y: 0,
              },
            }}
            className="pt-2 relative mx-auto w-full max-w-2xl text-gray-600"
          >
            <input
              className="border-2 border-gray-300 bg-white w-full h-14 px-5 pr-16 rounded text-lg focus:outline-none"
              type="search"
              name="search"
              placeholder="Search For USSD Code"
            />
            <button type="submit" className="absolute right-0 inset-y-0 mt-2 mr-5 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Home;
