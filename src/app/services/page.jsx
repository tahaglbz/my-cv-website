"use client"

import { BsArrowDownRight } from "react-icons/bs"
import Link from "next/link"
import {motion} from "framer-motion"

const services = [
  {
    num: "01",
    title: "Web Development",
    description: "I build high-performance websites that offer a smooth user experience. Utilizing the latest technologies like React, Next.js, and Node.js, I ensure that the web applications I create are fast, secure, and scalable.",
    href: ""
  },
  {
    num: "02",
    title: "Mobile App Development",
    description: "I develop mobile applications for both iOS and Android platforms. Whether it's using native technologies like Flutter and React-native, or cross-platform tools like Flutter and React Native, I focus on creating apps that deliver great performance and an intuitive user experience.",
    href: ""
  },
  {
    num: "03",
    title: "Desktop App Development",
    description: "I create custom desktop applications tailored to your needs. With experience in  .NET, and Java, I build secure and efficient desktop applications that run smoothly on multiple operating systems.",
    href: ""
  },
  {
    num: "04",
    title: "Database Design",
    description: "I design and implement scalable and efficient database systems to support your applications. Using technologies like PostgreSQL, MongoDB, and MySQL, I ensure that your data is well-structured, secure, and easy to manage.",
    href: ""
  }
]

const Services = () => {
  return (
   <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
  <div className="container mx-auto">
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
    >
      {services.map((service, index) => {
        return (
          <div key={index} className="flex flex-col justify-center gap-6 group">
            <div className="w-full flex justify-between items-center">
              {/* Number */}
              <div className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">
                {service.num}
              </div>
              
            </div>
            {/* Title */}
            <h2 className="text-[42px] font-bold leading-none text-white  group-hover:text-accent transition-all duration-500">{service.title}</h2>
            {/* Description */}
            <p className="text-white/80">{service.description}</p>
            {/* Border */}
            <div className="border-b border-white/20 w-full"></div>
          </div>
        );
      })}
    </motion.div>
  </div>
</section>

  )
}

export default Services;
