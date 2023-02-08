import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

function WaitlistOverlay({
  waitlistOverlayHide,
  hideWaitlistOverlay,
  form,
  setForm,
}) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = form.name;
    const email = form.email;

    try {
      // using axios for post request
      // pass name as form input value in the axios post method

      console.log({ name, email });
      const postRequest = axios.post(
        'https://sophia-backend.onrender.com/join-waitlist',
        {
          name,
          email,
        }
      );

      const response = await postRequest;

      toast.promise(postRequest, {
        loading: (response) => {
          if (!response) {
            return 'processing request';
          }
        },
        success: (response) => {
          if (
            response.status === 201 &&
            response.data.Requeststatus === 'success'
          ) {
            return 'email added successfully';
          }
        },
        error: (response) => {
          if (
            response.status !== 201 &&
            response.data.Requeststatus !== 'success'
          ) {
            return 'request failed, please try again';
          }
        },
        // loading: 'Loading',
        // success: 'Got the data',
        // error: 'Error when fetching',
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // const notify = () =>

  return (
    <>
      <Toaster />
      <section
        className={`waitlist-overlay bg--glass_white fixed top-0 left-0 right-0 min-h-screen pt-[150px] px-3 ${
          hideWaitlistOverlay ? 'hidden ' : 'block fade-in'
        }`}
      >
        <div
          className='close-btn fixed top-8 right-4 sm:right-8 border-[1px] rounded-[100%] p-3 bg-white'
          onClick={waitlistOverlayHide}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            //   width="20"
            //   height="20"
            fill='currentColor'
            className='bi bi-x-lg text-black w-[20px]'
            viewBox='0 0 16 16'
          >
            <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z' />
          </svg>
        </div>
        <div className='w-full xsm:w-[80%] sm:w-[70%] md:w-[400px] mx-auto'>
          <div className='flex justify-center pl-[15px] mb-10'>
            <span className='logo poppins text-black text-2xl font-bold relative mx-auto'>
              sophia
            </span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='input-group flex flex-col'>
              <label className='nunito-sans font-bold mb-2' htmlFor='name'>
                Name
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => {
                  setForm({
                    ...form,
                    name: e.target.value,
                  });
                }}
                name='name'
                id='name'
                className='outline-none p-3 border-b rounded'
              />
            </div>
            <div className='input-group flex flex-col mt-6'>
              <label className='nunito-sans font-bold mb-2' htmlFor='email'>
                Email address
              </label>
              <input
                required
                value={form.email}
                onChange={(e) => {
                  setForm({
                    ...form,
                    email: e.target.value,
                  });
                }}
                name='email'
                id='email'
                className='p-3 border-b outline-none rounded'
              />
            </div>
            <button
              className='nunito-sans mt-10 bg-black px-4 py-3 text-white w-full rounded text-[16px] font-bold'
              type='submit'
              // onClick={handleSubmit}
              // onClick={(e) => {
              //   e.preventDefault();
              //   console.log(form);
              // }}
            >
              Join Waitlist
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default WaitlistOverlay;
