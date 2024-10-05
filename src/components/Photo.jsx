"use client";
import { motion } from "framer-motion";
import Image from "next/image";
const Photo = () => {
  return (
    <div className = "w-full h-full relative">
          <motion.div>
              <div className="w-[298px] h-[298px] xl:w-[498px]">
                  <Image src="/src/app/assets/meavatar.png" priority quality={100} fill alt="avatar" className="object-contain" />
              </div>
      </motion.div>
    </div>
  )
}

export default Photo
