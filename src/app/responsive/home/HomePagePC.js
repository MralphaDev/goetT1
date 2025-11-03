'use client'
import React, { useEffect, useState,useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Link from 'next/link'
import ContactPage from '../../[locale]/Contact/page'
import Swipermodule from '../../[locale]/Swipermodule'

function HomePagePC() {
  const sectionsCount = 5
  const [current, setCurrent] = useState(0)
  const controls = useAnimation()
  const textControls = useAnimation();
  let wheelTimeout = null
  const ref = useRef(null);
  const contactRef = useRef(null);
  const contactControls = useAnimation();
  const productRef = useRef(null);
  const productControls = useAnimation();

  const handleWheel = (e) => {
    e.preventDefault()
    if (wheelTimeout) return
    wheelTimeout = setTimeout(() => (wheelTimeout = null), 800)
    if (e.deltaY > 0) setCurrent((prev) => Math.min(prev + 1, sectionsCount - 1))
    else setCurrent((prev) => Math.max(prev - 1, 0))
  }

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [])

  useEffect(() => {
    controls.start({ y: `-${current * 105}vh`, transition: { duration: 0.8, ease: 'easeInOut' } })
  }, [current])

  useEffect(() => {
  document.body.style.overflow = 'hidden';
  return () => {
    document.body.style.overflow = 'auto'; // reset when leaving
  }
}, []);


useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        textControls.start("visible");
      } else {
        textControls.start("hidden"); // reset when out of view
      }
    },
    { threshold: 0.3 }
  );
  if (ref.current) observer.observe(ref.current);
  return () => observer.disconnect();
}, [textControls]);

const variants = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) contactControls.start("visible");
        else contactControls.start("hidden"); // reset if scrolled away
      },
      { threshold: 0.2 }
    );
    if (contactRef.current) observer.observe(contactRef.current);
    return () => observer.disconnect();
  }, [contactControls]);

  const contactVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  useEffect(() => {
    if (!productRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) productControls.start('visible');
        else productControls.start('hidden');
      },
      { threshold: 0.2 }
    );
    observer.observe(productRef.current);
    return () => observer.disconnect();
  }, [productControls]);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' },
    }),
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <motion.div animate={controls} className="relative overflow-hidden">

        {/* SECTION 0 - Video */}
        <section className="h-screen w-full overflow-hidden">
          <video autoPlay loop muted className="object-cover w-full h-full">
            <source src='/p3.mp4' type="video/mp4" />
          </video>
        </section>

        {/* SECTION 1 - Accordion */}
        <section className="h-screen w-full bg-white flex overflow-hidden">
          <div className="flex w-full h-full">
            <div className="rounded-tl-3xl rounded-bl-3xl w-1/3 h-full relative overflow-hidden flex transition-all duration-500 hover:w-3/4">
              <video autoPlay loop muted className="object-cover w-full h-full">
                <source src="https://www.nieruf.de/media/8c/89/17/1683814602/NieRuf_Animation_Website_Produkt-Konfigurator_Akkordeon_DE_kom.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="w-1/3 h-full relative overflow-hidden transition-all duration-500 hover:w-3/4">
              <img src="https://www.nieruf.de/thumbnail/3f/97/45/1683190351/NieRuf_Bilder_Web-Startseite_Akkordeon_Bild-02_komprimiert_1920x1920.webp" alt="Image 2" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-tr-3xl rounded-br-3xl w-1/3 h-full relative overflow-hidden transition-all duration-500 hover:w-3/4">
              <img src="https://www.nieruf.de/thumbnail/0b/09/cf/1683190358/NieRuf_Bilder_Web-Startseite_Akkordeon_Bild-03_komprimiert_1920x1920.webp" alt="Image 3" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* SECTION 2 - Text & Image */}
    <section ref={ref} className="h-screen w-full bg-white flex overflow-hidden">
      {/* Left text section */}
      <div className="w-2/3 p-8 flex flex-col justify-center h-full space-y-4 pl-[5%] pr-[5%]">
        <motion.h2
          custom={0}
          initial="hidden"
          animate={textControls}
          variants={variants}
          className="text-5xl font-bold"
        >
          TECHNOLOGIE BRAUCHT <br />
          <span className="text-lightBlue">KONTROLLE</span>
        </motion.h2>

        <motion.p
          custom={1}
          initial="hidden"
          animate={textControls}
          variants={variants}
          className="text-xl pb-[20px]"
        >
          GoetValve, specializing in cryogenic valve
        </motion.p>

        <motion.p
          custom={2}
          initial="hidden"
          animate={textControls}
          variants={variants}
          className="text-base text-gray-700 text-justify w-4/5"
        >
          Goetvalve, which has been established for more than 20 years, is a professional company specializing in ultra-low temperature fluid control...
        </motion.p>

        <motion.p
          custom={3}
          initial="hidden"
          animate={textControls}
          variants={variants}
          className="text-base text-gray-700 text-justify w-4/5"
        >
          In order to fulfill the environmental protection initiative, GOETVALVE has specially omitted the casting process with high energy consumption...
        </motion.p>

        <motion.p
          custom={4}
          initial="hidden"
          animate={textControls}
          variants={variants}
          className="text-base text-gray-700 text-justify w-4/5"
        >
          Our philosophy is: design and manufacture high-quality, highly reliable, and cost-effective products, and provide customers with practical solutions.
        </motion.p>
      </div>

      {/* Right image section */}
      <div className="w-3/5 h-full relative flex items-center justify-center pr-[2%]">
        <img
          src="https://www.cemegroup.com/Content/images/assets/ceme_tecnologia.jpg"
          alt="Ceme Technology"
          className="w-full h-full object-cover rounded-lg"
        />
        {/* Fade-in button (after text finishes) */}
      <motion.div
        custom={5}
        initial="hidden"
        animate={textControls}
        variants={variants}
        className="flex justify-center items-center absolute bottom-[40%] right-[30vw] w-[369px] h-[85px] group"
        style={{
          backgroundColor: "#4FA1CA",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
        }}
      >
        <Link
          href="/de/Company"
          className="relative text-white text-[27px] z-10"
        >
          Entdecken Sie mehr
        </Link>
      </motion.div>
      </div>
    </section>
        {/* SECTION 3 - Products */}
        <section
          ref={productRef}
          className="h-screen w-full flex overflow-hidden bg-gray-50"
        >
  {/* Left Text Block */}
  <motion.div
    initial="hidden"
    animate={productControls}
    variants={fadeUp}
    className="flex flex-col justify-center p-8 bg-gray-900 text-white w-full md:w-1/3 h-full space-y-6"
  >
    <motion.h2
      custom={0}
      variants={fadeUp}
      className="text-4xl md:text-5xl font-extrabold uppercase tracking-wide leading-tight drop-shadow-md"
    >
      <span className="text-blue-400">Product</span>
    </motion.h2>
    <motion.h2
      custom={1}
      variants={fadeUp}
      className="text-4xl md:text-5xl font-extrabold uppercase tracking-wide leading-tight drop-shadow-md text-gray-200"
    >
      Application
    </motion.h2>
    <motion.h2
      custom={2}
      variants={fadeUp}
      className="text-4xl md:text-5xl font-extrabold uppercase tracking-wide leading-tight drop-shadow-md "
    >
      Support
    </motion.h2>
    <motion.p
      custom={3}
      variants={fadeUp}
      className="mt-6 text-gray-300 text-lg leading-relaxed max-w-sm"
    >
      Discover our solutions and services tailored to your needs. Explore our products, applications, and support options with ease.
    </motion.p>
  </motion.div>

  {/* Right Horizontal Cards */}
<motion.div
  initial="hidden"
  animate={productControls}
  className="flex flex-col items-start justify-center w-2/3 p-6 gap-6 bg-white"
>
  {/* Cards */}
  <div className="flex items-end gap-6 w-full h-3/4">
    {[
      { href: '/de/Product-login/Product1', src: 'http://www.goetvalve.eu/images/cc1.jpg', title: 'Products' },
      { href: '/de/Applications', src: 'http://www.goetvalve.eu/images/cc2.jpg', title: 'Applications' },
      { href: '/de/Service', src: 'http://www.goetvalve.eu/images/cc3.jpg', title: 'Service' },
    ].map((item, index) => (
      <motion.div
        key={index}
        custom={index}
        variants={fadeUp}
        className="flex-1 flex flex-col items-center"
      >
        {/* Card container */}
        <div className="w-full h-4/5 rounded-2xl shadow-xl hover:shadow-2xl border border-gray-200 overflow-hidden flex flex-col transition-transform transform hover:-translate-y-2">
          {/* Image */}
          <Link href={item.href} className="flex-1 w-full">
            <img
              src={item.src}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </Link>

          {/* Title container */}
          <div className="bg-white p-4 flex justify-center items-center border-t border-gray-200">
            <motion.span
              custom={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { delay: index * 0.2, duration: 0.6, ease: 'easeOut' } },
              }}
              className="text-gradient-to-r from-blue-400 via-lightBlue to-blue-600 text-3xl md:text-3xl font-bold uppercase tracking-widest text-center drop-shadow-xl"
            >
              {item.title}
            </motion.span>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</motion.div>

        </section>


        {/* SECTION 4 - Contact */}
        <section className="h-screen w-full overflow-hidden">
          <div className="h-full w-full pt-50">
            <ContactPage />
          </div>
        </section>

      </motion.div>
    </div>
  )
}

export default HomePagePC
