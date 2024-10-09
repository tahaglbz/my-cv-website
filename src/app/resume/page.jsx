"use client";
import React from "react";
import { FaHtml5, FaCss3, FaJs, FaJava, FaPython, FaPhp } from "react-icons/fa";
import {
  SiFlutter,
  SiCsharp,
  SiFirebase,
  SiMysql,
  SiDotnet,
  SiNextdotjs,
  SiTailwindcss,
} from "react-icons/si";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

const about = {
  title: "About Me",
  description:
    "I'm a full-stack developer with a passion for building scalable and efficient applications.",
  info: [
    { fieldName: "Full Name", fieldValue: "Taha Gülbaz" },

    
    { fieldName: "Experiences", fieldValue: "1+ years" },
    { fieldName: "Nationality", fieldValue: "Turk" },
    { fieldName: "Freelance", fieldValue: "Available" },
    { fieldName: "Languages", fieldValue: "Turkish, English" },
  ],
};

const experience = {
  icon: "/public/assets/assets/resume/badge.svg",
  title: "My Experience",
  description:
    "I have worked on various projects, including web development, mobile app development and data science",
  items: [
    {
      company: "Albayrak Media",
      position: "Mobile App Developer",
      duration: "2024 August - 2024 October",
    },
  ],
};

const education = {
  icon: "/public/assets/assets/resume/cap.svg",
  title: "My Education",
  description: "Training I received and online courses I attended",
  items: [
    {
      institution: "Haliç University",
      degree: "Software Engineering License",
      duration: "2021-2026",
    },
    {
      institution: "Online Course Platform",
      degree: "C# and .NET",
      duration: "2022",
    },
    {
      institution: "Online Course Platform",
      degree: "Mobile App Development with Flutter",
      duration: "2024",
    },
    {
      institution: "Online Course Platform",
      degree: "Advanced Programming with Java",
      duration: "2023",
    },
  ],
};

const skills = {
  title: "My Skills",
  description: "My Tech Skills",
  skillList: [
    { icon: SiCsharp, name: "C#" },
    { icon: SiFlutter, name: "Flutter" },
    { icon: FaJava, name: "Java" },
    { icon: FaJs, name: "JavaScript" },
    { icon: SiFirebase, name: "Firebase" },
    { icon: SiMysql, name: "MySQL" },
    { icon: FaCss3, name: "CSS3" },
    { icon: FaHtml5, name: "HTML5" },
    { icon: FaPhp, name: "PHP" },
    { icon: SiDotnet, name: ".NET" },
    { icon: FaPython, name: "Python" },
    {icon:SiNextdotjs, name:"NextJS"}
  ],
};

const Resume = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 2.4, duration: 0.4, ease: "easeIn" } }}
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <Tabs defaultValue="skills" className="flex flex-col xl:flex-row gap-[60px]">
          <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="about">About me</TabsTrigger>
          </TabsList>

          <TabsContent value="skills" className="w-full h-full">
            <div className="flex flex-col gap-[30px]">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{skills.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {skills.description}
                </p>
              </div>
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:gap-[30px]">
                {skills.skillList.map((skill, index) => {
                  return (
                    <li key={index}>
                      <TooltipProvider delay={100}>
                        <Tooltip>
                          <TooltipTrigger className="w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group">
                            <div className="text-6xl group-hover:text-accent transition-all duration-300">
                              {React.createElement(skill.icon)}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="capitalize">{skill.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </li>
                  );
                })}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="education" className="w-full">
            <div className="flex flex-col gap-[30px] text-center xl:text-left">
              <h3 className="text-4xl font-bold">{education.title}</h3>
              <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                {education.description}
              </p>
              <ScrollArea className="h-[400px]">
                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                  {education.items.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                      >
                        <span className="text-accent"> {item.duration} </span>
                        <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">
                          {item.degree}
                        </h3>
                        <div className="flex items-center gap-3">
                          <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                          <p className="text-white/60">{item.institution}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="experience" className="w-full">
            <div className="flex flex-col gap-[30px] text-center xl:text-left">
              <h3 className="text-4xl font-bold">{experience.title}</h3>
              <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                {experience.description}
              </p>
              <ScrollArea className="h-[400px]">
                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                  {experience.items.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                      >
                        <span className="text-accent"> {item.duration} </span>
                        <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">
                          {item.position}
                        </h3>
                        <div className="flex items-center gap-3">
                          <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                          <p className="text-white/60">{item.company}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="about" className="w-full text-center xl:text-left">
            <div className="flex flex-col gap-[30px]">
              <h3 className="text-4xl font-bold">{about.title}</h3>
              <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{about.description}</p>
              <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0">{about.info.map((item, index) => {
                return (
                  <li className="flex items-center justify-center xl:justify-start gap-4" key={index}>
                    <span className="text-white/60">{item.fieldName}</span>
                    <span className="text-xl">{ item.fieldValue}</span>
                  </li>
                )
              })}</ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Resume;
