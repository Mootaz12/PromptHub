import React from "react";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ReduxProvider from "@/providers/ReduxProvider";
import SearchPromptForm from "@/components/SearchPromptForm";
const homePage = () => {
  return (
    <React.Fragment>
      <Navbar />
      <main>
        <Hero />
        <ReduxProvider>
          <SearchPromptForm />
        </ReduxProvider>
      </main>
    </React.Fragment>
  );
};

export default homePage;
