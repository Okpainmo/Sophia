import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

function WaitlistOverlay({
  waitlistOverlayHide,
  hideWaitlistOverlay,
  form,
  setForm,
}) {
  const [showResponsePreloader, setShowResponsePreLoader] = useState(false);

  const ResponsePreloaderShow = () => {
    setShowResponsePreLoader(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    ResponsePreloaderShow();

    const name = form.name;
    const email = form.email;

    try {
      // using axios for post request
      // pass name as form input value in the axios post method

      console.log({ name, email });
      const postRequest = await axios.post(
        'https://sophia-backend.onrender.com/join-waitlist',
        {
          name,
          email,
        }
      );

      if (postRequest) {
        setShowResponsePreLoader(false);
      }

      console.log(postRequest);
      if (
        postRequest.status === 201 &&
        postRequest.data.requestStatus === 'success'
      ) {
        toast.success(
          'Email added successfully. Please check your email, we just sent you a welcome message.',
          {
            duration: 6000,
          }
        );
      }

      if (
        postRequest.status !== 201 &&
        postRequest.data.requestStatus !== 'success'
      ) {
        toast.error('request declined: please try again', {
          duration: 10000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error('request declined: please try again', {
        duration: 10000,
      });
    }
  };

  // const notify = () =>

  return (
    <>
      <Toaster />
      <section
        className={`waitlist-overlay bg--glass_white fixed top-0 left-0 right-0 min-h-screen pt-[118px] px-3 ${
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
        <div className='w-full xsm:w-[80%] sm:w-[70%] md:w-[400px] mx-auto relative'>
          <div
            className={`absolute items-center gap-[10px] justify-center top-[-100px] left-[25%] text-grey-500 shadow-md mb-8 mx-auto response-preloader text-center rounded-[10px] w-[200px] bg-white px-2 pt-[5px] pb-[9px] ${
              showResponsePreloader ? 'flex' : 'hidden'
            }`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              className='rotating relative top-[2px]'
              fill='currentColor'
              viewBox='0 0 16 16'
            >
              <path d='M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z' />
              <path
                fill-rule='evenodd'
                d='M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z'
              />
            </svg>
            <span>processing request.</span>
          </div>
          <div className='flex justify-center pl-[15px] mb-10'>
            <span className='logo poppins text-black text-2xl font-bold relative mx-auto'>
              sophia
            </span>
          </div>
          <form
            onSubmit={handleSubmit}
            className='waitlist-overlay bg--glass_white shadow-lg px-[15px] xsm:px-[30px] py-[30px] rounded-md'
          >
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
