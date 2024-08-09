import React from "react";

const Hero = () => {
  return (
    <section className="lg:mt-22 mt-6 flex flex-col items-center text-center md:mt-20">
      <h1 className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 bg-clip-text text-3xl font-bold text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-pink-300 md:text-5xl lg:text-6xl">
        Welcome to PromptHub
      </h1>
      <p className="mt-7 max-w-[350px] text-sm leading-relaxed text-gray-800 dark:text-gray-200 md:max-w-[500px] md:text-sm lg:max-w-[700px] lg:text-lg">
        Discover, share, and collaborate on creative prompts. Unleash your
        imagination and join our community of writers, artists, and thinkers.
      </p>
    </section>
  );
};

export default Hero;
