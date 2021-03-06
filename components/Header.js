import React from "react";
import Image from "next/image";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from "@heroicons/react/outline";

import { HomeIcon } from "@heroicons/react/solid";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
// import { signIn, useSession, signOut } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useRecoilState } from "recoil";
// import { modalState } from "../atoms/modalAtom";

export default function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter();

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 ">
      <div className="flex justify-between  max-w-6xl  items-center mx-5 lg:mx-auto">
        {/* left */}
        <div
          onClick={() => router.push("/")}
          className="  relative  hidden lg:inline-grid   w-24 cursor-pointer"
        >
          <img
            src="https://links.papareact.com/ocw"
            // layout="fill"
            alt=""
            objectFit="contain"
          />
        </div>
        <div
          onClick={() => router.push("/")}
          className="  relative   w-10 lg:hidden flex-shrink-0 cursor-pointer"
        >
          <img
            src="https://links.papareact.com/jjm"
            alt=""
            objectFit="contain"
          />
        </div>
        {/* Middle-> Search */}
        <div className="max-w-xs">
          <div className="relative  mt-1 p-3 rounded-md ">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none ">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
        {/* right */}
        <div className="flex items-center justify-end space-x-4 border-b-2 ">
          <HomeIcon onClick={() => router.push("/")} className=" navBtn" />
          <MenuIcon className="h-6 md:hidden cursor-pointer " />

          <div className="relative navBtn">
            {/* custome utility class -> navBtn */}
            <PaperAirplaneIcon className="navBtn rotate-45" />
            <div className="absolute -top-1 -right-2 text-xs w-5 h-5 justify-center bg-red-500 rounded-full flex items-center animate-pulse text-white">
              30
            </div>
          </div>
          {/* upload post */}
          <PlusCircleIcon onClick={() => setOpen(true)} className="navBtn" />
          <UserGroupIcon className="navBtn" />
          <HeartIcon className="navBtn" />

          {!session ? (
            <button onClick={signIn}>Sign In</button>
          ) : (
            <img
              onClick={signOut}
              className="h-10  w-10 rounded-full cursor-pointer hover:scale-105 transition-all duration-150 ease-out"
              src={session?.user?.image}
              alt=""
            />
          )}
        </div>
      </div>
    </div>
  );
}
//Latest
//  import React from "react";
// // import Image from "next/image";
// import {
//   SearchIcon,
//   PlusCircleIcon,
//   UserGroupIcon,
//   HeartIcon,
//   PaperAirplaneIcon,
//   MenuIcon,
// } from "@heroicons/react/outline";

// import { HomeIcon } from "@heroicons/react/solid";
// import { useSession, signIn, signOut } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useRecoilState } from "recoil";
// import { modalState } from "../atoms/modalAtom";
// // import { signIn, useSession, signOut } from "next-auth/react";
// // import { useRouter } from "next/router";
// // import { useRecoilState } from "recoil";
// // import { modalState } from "../atoms/modalAtom";

// export default function Header() {
//   const { data: session } = useSession();
//   const [open, setOpen] = useRecoilState(modalState);
//   const router = useRouter();

//   return (
//     <div className="shadow-sm border-b bg-white sticky top-0 ">
//       <div className="flex justify-between  max-w-6xl  items-center mx-5 lg:mx-auto">
//         {/* left */}
//         <div
//           onClick={() => router.push("/")}
//           className="  relative  hidden lg:inline-grid   w-24 cursor-pointer"
//         >
//           <img
//             src="https://links.papareact.com/ocw"
//             alt=""
//             objectFit="contain"
//           />
//         </div>
//         <div
//           onClick={() => router.push("/")}
//           className="  relative   w-10 lg:hidden flex-shrink-0 cursor-pointer"
//         >
//           <img
//             src="https://links.papareact.com/jjm"
//             alt=""
//             objectFit="contain"
//           />
//         </div>
//         {/* Middle-> Search */}
//         <div className="max-w-xs">
//           <div className="relative  mt-1 p-3 rounded-md ">
//             <div className="absolute inset-y-0 pl-3 flex items-center ">
//               <SearchIcon className="h-5 w-5 text-gray-500" />
//             </div>
//             <input
//               className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black"
//               type="text"
//               placeholder="Search"
//             />
//           </div>
//         </div>
//         {/* right */}
//         <div className="flex items-center justify-end space-x-4 border-b-2 ">
//           <HomeIcon onClick={() => router.push("/")} className=" navBtn" />
//           <MenuIcon className="h-6 md:hidden cursor-pointer " />
//           {session ? (
//             <>
//               <div className="relative navBtn">
//                 <PaperAirplaneIcon className="navBtn rotate-45" />
//                 <div className="absolute -top-1 -right-2 text-xs w-5 h-5 justify-center bg-red-500 rounded-full flex items-center animate-pulse text-white">
//                   30
//                 </div>
//               </div>
//               <PlusCircleIcon
//                 onClick={() => setOpen(true)}
//                 className="navBtn"
//               />
//               <UserGroupIcon className="navBtn" />
//               <HeartIcon className="navBtn" />
//               <img
//                 onClick={signOut}
//                 className="h-10  w-10 rounded-full cursor-pointer hover:scale-105 transition-all duration-150 ease-out"
//                 src={session?.user?.image}
//                 alt=""
//               />
//             </>
//           ) : (
//             <button onClick={signIn}>Sign In</button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// import React from "react";
// // import Image from "next/image";
// import {
//   SearchIcon,
//   PlusCircleIcon,
//   UserGroupIcon,
//   HeartIcon,
//   PaperAirplaneIcon,
//   MenuIcon,
// } from "@heroicons/react/outline";

// import { HomeIcon } from "@heroicons/react/solid";
// import { useSession, signIn, signOut } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useRecoilState } from "recoil";
// import { modalState } from "../atoms/modalAtom";
// // import { signIn, useSession, signOut } from "next-auth/react";
// // import { useRouter } from "next/router";
// // import { useRecoilState } from "recoil";
// // import { modalState } from "../atoms/modalAtom";

// export default function Header() {
//   const { data: session } = useSession();
//   const [open, setOpen] = useRecoilState(modalState);
//   const router = useRouter();

//   return (
//     <div className="shadow-sm border-b bg-white sticky top-0 ">
//       <div className="flex justify-between  max-w-6xl  items-center mx-5 lg:mx-auto">
//         {/* left */}
//         <div
//           onClick={() => router.push("/")}
//           className="  relative  hidden lg:inline-grid   w-24 cursor-pointer"
//         >
//           <img
//             src="https://links.papareact.com/ocw"
//             alt=""
//             objectFit="contain"
//           />
//         </div>
//         <div
//           onClick={() => router.push("/")}
//           className="  relative   w-10 lg:hidden flex-shrink-0 cursor-pointer"
//         >
//           <img
//             src="https://links.papareact.com/jjm"
//             alt=""
//             objectFit="contain"
//           />
//         </div>
//         {/* Middle-> Search */}
//         <div className="max-w-xs">
//           <div className="relative  mt-1 p-3 rounded-md ">
//             <div className="absolute inset-y-0 pl-3 flex items-center ">
//               <SearchIcon className="h-5 w-5 text-gray-500" />
//             </div>
//             <input
//               className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black"
//               type="text"
//               placeholder="Search"
//             />
//           </div>
//         </div>
//         {/* right */}

//         <div className="flex items-center justify-end space-x-4 border-b-2 ">
//           <HomeIcon onClick={() => router.push("/")} className=" navBtn" />
//           <MenuIcon className="h-6 md:hidden cursor-pointer " />

//           <div className="relative navBtn">
//             <PaperAirplaneIcon className="navBtn rotate-45" />
//             <div className="absolute -top-1 -right-2 text-xs w-5 h-5 justify-center bg-red-500 rounded-full flex items-center animate-pulse text-white">
//               30
//             </div>
//           </div>
//           <PlusCircleIcon onClick={() => setOpen(true)} className="navBtn" />
//           <UserGroupIcon className="navBtn" />
//           <HeartIcon className="navBtn" />
//           {session ? (
//             <img
//               onClick={signOut}
//               className="h-10  w-10 rounded-full cursor-pointer hover:scale-105 transition-all duration-150 ease-out"
//               src={session?.user?.image}
//               alt=""
//             />
//           ) : (
//             <button onClick={signIn}>Sign In</button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// import React from "react";

// // import Image from "next/image";
// import {
//   SearchIcon,
//   PlusCircleIcon,
//   UserGroupIcon,
//   HeartIcon,
//   PaperAirplaneIcon,
//   MenuIcon,
// } from "@heroicons/react/outline";

// import { HomeIcon } from "@heroicons/react/solid";
// import { useSession, signIn, signOut } from "next-auth/react";
// import { useRouter } from "next/router";
// // import { signIn, useSession, signOut } from "next-auth/react";
// // import { useRouter } from "next/router";
// // import { useRecoilState } from "recoil";
// // import { modalState } from "../atoms/modalAtom";

// export default function Header() {
//   const { data: session } = useSession();
//   const router = useRouter();

//   return (
//     <div className="shadow-sm border-b bg-white sticky top-0 ">
//       <div className="flex justify-between  max-w-6xl  items-center mx-5 lg:mx-auto">
//         {/* left */}
//         <div
//           onClick={() => router.push("/")}
//           className="  relative  hidden lg:inline-grid   w-24 cursor-pointer"
//         >
//           <img
//             src="https://links.papareact.com/ocw"
//             alt=""
//             objectFit="contain"
//           />
//         </div>
//         <div
//           onClick={() => router.push("/")}
//           className="  relative   w-10 lg:hidden flex-shrink-0 cursor-pointer"
//         >
//           <img
//             src="https://links.papareact.com/jjm"
//             alt=""
//             objectFit="contain"
//           />
//         </div>
//         {/* Middle-> Search */}
//         <div className="max-w-xs">
//           <div className="relative  mt-1 p-3 rounded-md ">
//             <div className="absolute inset-y-0 pl-3 flex items-center ">
//               <SearchIcon className="h-5 w-5 text-gray-500" />
//             </div>
//             <input
//               className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black"
//               type="text"
//               placeholder="Search"
//             />
//           </div>
//         </div>
//         {/* right */}
//         <div className="flex items-center justify-end space-x-4 border-b-2 ">
//           <HomeIcon onClick={() => router.push("/")} className=" navBtn" />
//           <MenuIcon className="h-6 md:hidden cursor-pointer " />
//           {session ? (
//             <>
//               <div className="relative navBtn">
//                 <PaperAirplaneIcon className="navBtn rotate-45" />
//                 <div className="absolute -top-1 -right-2 text-xs w-5 h-5 justify-center bg-red-500 rounded-full flex items-center animate-pulse text-white">
//                   30
//                 </div>
//               </div>
//               <PlusCircleIcon className="navBtn" />
//               <UserGroupIcon className="navBtn" />
//               <HeartIcon className="navBtn" />
//               <img
//                 onClick={signOut}
//                 className="h-10  w-10 rounded-full cursor-pointer hover:scale-105 transition-all duration-150 ease-out"
//                 src={session?.user?.image}
//                 alt=""
//               />
//             </>
//           ) : (
//             <button onClick={signIn}>Sign In</button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
