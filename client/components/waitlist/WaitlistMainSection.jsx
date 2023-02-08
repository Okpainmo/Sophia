import React from 'react';
import Image from 'next/image';
import waitlistIllustration from '../../assets/illustrations/waitlist-illustration.svg';

function WaitlistMainSection({ waitlistOverlayShow }) {
  return (
    <main className='w-full lg:w-[80%] mx-auto px-[12px] pt-24 pb-16'>
      <section className='left px-[12px]'>
        <Image
          width={400}
          height={300}
          src={waitlistIllustration}
          alt='waitlist-illutration'
          className='mx-auto'
        />
      </section>
      <section className='pt-16 text-center sm:w-[80%] mx-auto'>
        <h3 className='poppins text-4xl font-bold'>
          We&#39;re building Sophia
        </h3>
        <p className='nunito-sans text-[18px] pt-6'>
          Sophia is a learning enhancement system(LES) built to support student
          performance in all academic programmes available in and around the
          federal polytechnic Bida, Nigeria. <br /> Sophia is a project powered
          by Deeper Life Campus Fellowship(DLCF) Bida.
        </p>
        <p className='nunito-sans text-[18px] pt-6'>
          Sophia is still in the development/testing phase. The project will
          provide a past question bank, a study feature for students to study
          online, and a live CBT feature for students to practice mock
          examinations.
        </p>
        <p className='nunito-sans text-[18px] pt-6'>
          You can Join the waitlist and gain early access to be among the first
          persons to get information about updates we release. <br /> We&#39;ll
          greatly appreciate every feedback you supply to help us fine-tune all
          the new features we&#39;ll be rolling out.
        </p>
        <p className='nunito-sans text-[18px] pt-6'>
          Click the button below, to Join our waitlist and gain early access.
        </p>
        <button
          className='nunito-sans mt-10 bg-black px-4 py-3 text-white w-full rounded text-[16px] font-bold'
          onClick={waitlistOverlayShow}
        >
          Gain Early Access
        </button>
      </section>
    </main>
  );
}

export default WaitlistMainSection;
