import React, { useState } from 'react';
import WaitlistNav from './WaitlistNav';
import WaitlistMainSection from './WaitlistMainSection';
import WaitlistOverlay from './WaitlistOverlay';

function WaitlistHome() {
  const [hideWaitlistOverlay, setHideWaitlistOverlay] = useState(true);

  const [form, setForm] = useState({
    email: '',
    name: '',
  });

  const waitlistOverlayShow = () => {
    setHideWaitlistOverlay(false);
  };

  const waitlistOverlayHide = () => {
    setHideWaitlistOverlay(true);
    setForm({
      name: '',
      email: '',
    });
  };

  return (
    <>
      <WaitlistNav />
      <WaitlistMainSection waitlistOverlayShow={waitlistOverlayShow} />
      <WaitlistOverlay
        waitlistOverlayHide={waitlistOverlayHide}
        hideWaitlistOverlay={hideWaitlistOverlay}
        form={form}
        setForm={setForm}
      />
    </>
  );
}

export default WaitlistHome;
