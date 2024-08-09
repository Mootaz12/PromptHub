import UserPrompts from "@/components/UserPrompts";
import ReduxProvider from "@/providers/ReduxProvider";

const UserPage = ({ params }: { params: { slug: string } }) => {
  const { slug }: { slug: string } = params;

  return (
    <main className="mt-10 flex flex-col items-center">
      <h1 className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 bg-clip-text text-3xl font-bold text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-pink-300 md:text-5xl lg:text-6xl">
        My Profile
      </h1>
      <p className="mt-7 max-w-[350px] text-sm leading-relaxed text-gray-800 dark:text-gray-200 md:max-w-[500px] md:text-sm lg:max-w-[700px] lg:text-lg">
        Welcome to your personolized profile
      </p>
      <ReduxProvider>
        <UserPrompts
          params={{
            slug: slug,
          }}
        />
      </ReduxProvider>
    </main>
  );
};

export default UserPage;
