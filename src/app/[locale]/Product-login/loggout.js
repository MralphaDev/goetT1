"use client";

import { useRouter,usePathname} from "next/navigation";

const SignOutButton = () => {
  const router = useRouter();
const pathname = usePathname(); // ✅ inside component
     // Split the path and take only the first segment after /
  const segments = pathname.split("/"); // ["", "en", "Product-login", "Product1"]
  const locale = segments[1]; // "en", "de", "it"

  const loginPath = `/${locale}/login`; // "/en/login"

  const handleSignOut = () => {
    // Clear login state
    localStorage.setItem("loggedIn", "false");
    localStorage.removeItem("user");

    // Optionally reload or redirect
    router.push(loginPath); // replace "en" with dynamic locale if needed
  };

  return (
    <div className="fixed top-8 right-4 z-50">
      <button
        className="block bg-[#28A8DE] text-white py-2 px-4 rounded shadow hover:bg-blue-500 transition duration-300"
        onClick={handleSignOut}
      >
        Sign out
      </button>
    </div>
  );
};

export default SignOutButton;

  