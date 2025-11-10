"use client";

import { useRouter, usePathname } from "next/navigation";

const SignOutButton = ({
  overlayOpen: propOverlayOpen,
  setOverlayOpen: propSetOverlayOpen,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split("/"); 
  const locale = segments[1] || "en";

  const loginPath = `/${locale}/login`;

  const handleSignOut = () => {
    localStorage.setItem("loggedIn", "false");
    localStorage.removeItem("user");
    router.push(loginPath);
    if (propSetOverlayOpen) propSetOverlayOpen(false);
  };

  const overlayOpen = propOverlayOpen !== undefined ? propOverlayOpen : false;

  return (
    <>
      {/* Desktop: always show */}
      <div className="hidden md:block fixed top-8 right-4 z-50">
        <button
          className="bg-[#28A8DE] text-white py-2 px-4 rounded shadow hover:bg-blue-500 transition duration-300"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>

      {/* Mobile: show only if overlayOpen */}
      {overlayOpen && (
        <div className="block md:hidden fixed top-25 right-4 z-50">
          <button
            className="bg-[#28A8DE] text-white py-2 px-4 rounded shadow hover:bg-blue-500 transition duration-300"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      )}
    </>
  );
};

export default SignOutButton;
