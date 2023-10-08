import "@styles/globals.css";
export const metadata = {
  title: "Promptomia",
  description: "Discover & Share AI prompts",
};
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        {" "}
        <div className="main">
          <div className="gradient"></div>
        </div>
        <main className="app">{children} </main>
      </body>
    </html>
  );
};

export default RootLayout;
