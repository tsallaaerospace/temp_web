'use client';

import React from 'react';

const App = () => {
  const backgroundImageUrl =
    '/careers/hero%20section.png';

  return (
    <main className="font-orbit bg-black">
      <section className="relative w-full h-screen text-white overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
          aria-hidden="true"
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 z-0" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-end h-full px-4 sm:px-6 md:px-20 lg:px-20 2xl:px-22 pt-24 pb-6">
          <div className="flex flex-col-reverse md:flex-row w-full items-start gap-6 md:gap-10 max-w-7xl 2xl:max-w-[90rem] 3xl:max-w-[110rem] mx-auto">
            {/* Left: Headline */}
            <div className="absolute left-4 right-4 top-[max(6rem,12svh)] md:static text-left md:w-full md:flex-1 min-w-0">
              <h1 className="careers-hero-title py-0 my-0 px-0 mx-0">
                WORK WITH PURPOSE
              </h1>
            </div>

            {/* Right: Subtext */}
            <div className="text-left w-[90%] md:w-[48%] max-w-2xl self-center md:self-auto">
              <h2 className="careers-card-title careers-hero-subtitle text-center md:text-left mb-3">
                Be Part Of Something Bigger.
              </h2>
              <p className="careers-body careers-hero-copy text-neutral-300 text-justify">
                At Tsalla Aerospace, we're building technology that pushes
                boundaries and inspires impact. We’re not just innovating—we’re
                shaping the future.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default App;
