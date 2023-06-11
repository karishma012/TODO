import React from 'react';
import Typed from 'react-typed';
export const HomePage = () => {
 

  return (
    <div className="bg-cover bg-no-repeat bg-center min-h-screen" >
      <div className="relative flex flex-col-reverse py-16 lg:py-0 lg:flex-col">
        <div className="w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:py-20 lg:max-w-screen-xl">
          <div className="mb-0 lg:max-w-lg lg:pr-8 xl:pr-6">
            <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight text-black sm:text-4xl sm:leading-none md:text-center">
              <div className="text-grey-600 text-6xl font-bold animate-pulse">
                <Typed strings={[' Welcome to TaskPlanner']} typeSpeed={40} />
              </div>
            </h2>
            <div className="bg-gray-300 py-4 px-6 rounded-md">
            <p className="mb-5 text-base py-10 font-bold text-black md:text-lg md:text-center">
              TaskPlanner is a powerful task management application designed to help you stay organized and accomplish your
              goals efficiently. Whether you're a busy professional, a student, or a homemaker, TaskPlanner is your ultimate
              productivity companion.
            </p>
           </div>
            <div className="mb-10 text-center md:mb-16 lg:mb-20 py-5">
              <a
                href="/login"
                className="inline-flex items-center justify-center w-full h-12 px-6
      font-medium tracking-wide text-white transition duration-200 rounded shadow-md md:w-auto
      bg-gradient-to-r from-pink-500 via-red-500 to-yellow-200 text-white hover:bg-pink-400 focus:outline-none"
                onClick={(e) => {
                  e.target.classList.add("bg-red-500", "hover:bg-red-600");
                }}
              >
                GET STARTED
              </a>
            </div>

          </div>
        </div>
        <div className="inset-y-0 top-0 right-9 w-full max-w-xl px-9 mx-auto mb-6 md:px-0 py-8 lg:pl-8 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-1/2 lg:max-w-full lg:absolute xl:px-0">
          <img
            className="object-cover w-full h-3/4 rounded shadow-lg lg:rounded-none lg:shadow-none md:w-full md:h-1/2 lg:h-3/4"
            src="https://img.freepik.com/free-photo/hands-unrecognizable-man-sitting-table-with-laptop-drawing-diagram-notebook_1098-20178.jpg?w=1060&t=st=1686311456~exp=1686312056~hmac=2f6a073d8bcbbd63e1ca5fccf249c88e39b9ab9cb91947b6e5b960670bd7054f"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;



// import React from 'react';
// import Typed from 'react-typed';
// import toImage from '../components/to3.webp';

// export const HomePage = () => {
//   return (
//     <div className="bg-cover bg-no-repeat bg-center min-h-screen" style={{ backgroundImage: `url(${toImage})` }}>
//       <div className="relative flex flex-col-reverse py-16 lg:py-0 lg:flex-col">
//         <div className="w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:py-20 lg:max-w-screen-xl">
//           <div className="mb-0 lg:max-w-lg lg:pr-8 xl:pr-6">
//             <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none md:text-center">
//               <div className="text-grey-600 text-6xl font-bold animate-pulse">
//                 <Typed strings={[' Welcome to TaskPlanner']} typeSpeed={40} />
//               </div>
//             </h2>
//             <p className="mb-5 text-base py-10 font-bold text-gray-500 md:text-lg md:text-center">
//               TaskPlanner is a powerful task management application designed to help you stay organized and accomplish your
//               goals efficiently. Whether you're a busy professional, a student, or a homemaker, TaskPlanner is your ultimate
//               productivity companion.
//             </p>
//             <div className="mb-10 text-center md:mb-16 lg:mb-20">
//               <a
//                 href="/login"
//                 className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md md:w-auto hover:border-white hover:text-red-500 focus:shadow-outline focus:outline-none border-2 border-white md:mx-auto md:max-w-sm lg:max-w-md"
//               >
//                 GET STARTED
//               </a>
//             </div>
//           </div>
//         </div>
//         <div className="inset-y-0 top-0 right-9 w-full max-w-xl px-9 mx-auto mb-6 md:px-0 py-8 lg:pl-8 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-1/2 lg:max-w-full lg:absolute xl:px-0">
//           <img
//             className="object-cover w-full h-3/4 rounded shadow-lg lg:rounded-none lg:shadow-none md:w-full md:h-1/2 lg:h-3/4"
//             src="https://img.freepik.com/free-photo/hands-unrecognizable-man-sitting-table-with-laptop-drawing-diagram-notebook_1098-20178.jpg?w=1060&t=st=1686311456~exp=1686312056~hmac=2f6a073d8bcbbd63e1ca5fccf249c88e39b9ab9cb91947b6e5b960670bd7054f"
//             alt=""
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;
