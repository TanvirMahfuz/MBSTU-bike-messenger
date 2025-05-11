export default function HeroSection({ openModal, setOpenModal }) {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
        Welcome to MBSTU Bike Messenger
      </h1>
      <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
        This platform helps you put your bikes to rent and find bikes when you
        need one
      </p>
      <div className="mt-8">
        <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setOpenModal(true)}
        >
          Add Your Bike for Rent
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-3 -mr-1 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
