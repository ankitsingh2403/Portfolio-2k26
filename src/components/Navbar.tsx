"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);
  const [showMenuIcon, setShowMenuIcon] = useState(false);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const isContactPage = pathname === "/contact";

  const navItems = ["Work", "About", "Contact"];

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setHideNavbar(scrollTop > 10);
      setShowMenuIcon(scrollTop > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={
          mounted
            ? {
                y: hideNavbar ? -100 : 0,
                opacity: hideNavbar ? 0 : 1,
              }
            : {}
        }
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className={`fixed top-0 left-0 w-full flex items-center justify-between
        px-6 sm:px-8 md:px-12 lg:px-32 py-6
        z-50 font-sans transition-all duration-500
        bg-transparent
        ${isContactPage ? "text-white" : "text-black"}
        `}
      >

        {/* LOGO SWITCH */}
        {pathname === "/" || pathname === "/contact" ? (
          <MagneticLogo />
        ) : (
          <StaticLogo />
        )}

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-10 font-semibold tracking-wide text-base md:text-[17px] uppercase">
          {navItems.map((item) => (
            <MagneticLink key={item}>
              <Link
                href={
                  item === "Work"
                    ? "/work"
                    : item === "About"
                    ? "/about"
                    : "/contact"
                }
              >
                {item}
              </Link>
            </MagneticLink>
          ))}
        </ul>
      </motion.nav>

      {/* MENU BUTTON */}
      <AnimatePresence>
        {showMenuIcon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <RoundMenuButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ scale: 0, rotate: 45, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: 45, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed top-0 right-0 h-full w-72 sm:w-60 bg-black/90 backdrop-blur-md
            text-white flex flex-col items-center justify-center z-40 p-6"
          >
            {navItems.map((link, i) => (
              <motion.div
                key={link}
                initial={{ opacity: 0, x: 50, y: -50, rotate: -15 }}
                animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: i * 0.1,
                }}
              >
                <Link
                  href={
                    link === "Work"
                      ? "/work"
                      : link === "About"
                      ? "/about"
                      : "/contact"
                  }
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl sm:text-xl font-bold tracking-wider hover:text-blue-400 transition uppercase mb-6 block"
                >
                  {link}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};



/* STATIC LOGO (FOR WORK & ABOUT) */

const StaticLogo = () => {
  const router = useRouter();

  return (
    <h1
      onClick={() => router.push("/")}
      className="text-lg font-bold tracking-wider cursor-pointer select-none uppercase"
    >
      © Code by Ankit
    </h1>
  );
};



/* MAGNETIC NAV LINK */

const MagneticLink = ({ children }: { children: React.ReactNode }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLLIElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) / 2);
    y.set((e.clientY - rect.top - rect.height / 2) / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.li
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="relative cursor-pointer select-none transition-colors duration-300 hover:text-gray-200 font-semibold"
    >
      <motion.span className="inline-block px-2 py-1 uppercase">
        {children}
      </motion.span>
    </motion.li>
  );
};



/* ROUND MENU BUTTON */

const RoundMenuButton = ({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      onClick={() => setMenuOpen(!menuOpen)}
      className="fixed top-6 right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-black text-white
      rounded-full flex items-center justify-center cursor-pointer overflow-hidden
      group shadow-lg"
    >
      <span className="absolute inset-0 bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out" />

      <motion.div
        initial={false}
        animate={{ rotate: menuOpen ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="z-10 relative"
      >
        {menuOpen ? (
          <FiX className="text-2xl sm:text-3xl" />
        ) : (
          <FiMenu className="text-2xl sm:text-3xl" />
        )}
      </motion.div>
    </motion.div>
  );
};



/* MAGNETIC LOGO (HOME + CONTACT ONLY) */

const MagneticLogo = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) / 3);
    y.set((e.clientY - rect.top - rect.height / 2) / 3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      onClick={() => router.push("/")}
      className="relative cursor-pointer select-none uppercase text-lg font-bold tracking-wider min-w-[230px] h-[24px]"
    >
      <span
        className={`absolute transition-opacity duration-200 ${
          hovered ? "opacity-0" : "opacity-100"
        }`}
      >
        © Code by Ankit
      </span>

      <span
        className={`absolute transition-opacity duration-200 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        Ankit Kumar Singh
      </span>
    </motion.div>
  );
};

export default Navbar;