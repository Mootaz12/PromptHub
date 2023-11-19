import Feed from "@components/Feed";
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> AI-Powred Prompts</span>
      </h1>
      <p className="dedsc text-center">
        Promptopia is an open-source AI prompting toll for modern world to
        discover , create and share crative prompts
      </p>
      <Feed />
    </section>
  );
};

export default Home;
