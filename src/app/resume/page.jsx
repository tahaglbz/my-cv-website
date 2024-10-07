"use client";
import { FaHtml5, FaCss3, FaJs, FaJava, FaPython, FaPhp } from "react-icons/fa";
import { SiFlutter, SiCsharp, SiFirebase, SiMysql, SiDotnet, SiNextdotjs, SiTailwindcss } from "react-icons/si";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { delay, motion } from "framer-motion";

const about = {
  title: "About Me",
  description: "I'm a full-stack developer with a passion for building scalable and efficient applications.",
  info: [
    {
      fieldName: "Full Name",
      fieldValue: "Taha Gülbaz"
    },
    {
      fieldName: "Phone",
      fieldValue: "+90 5313256038"
    },
    {
      fieldName: "Experiences",
      fieldValue: "1+ years"
    },
    {
      fieldName: "Nationality",
      fieldValue: "Turk"
    },
    {
      fieldName: "Email",
      fieldValue: "tahaglbz1@gmail.com"
    },
    {
      fieldName: "Freelance",
      fieldValue: "Available"
    },
    {
      fieldName: "Languages",
      fieldValue: "Turkish, English"
    },
  ]
};

const experience = {
  icon: '/public/assets/assets/resume/badge.svg',
  title: "My Experience",
  description: "I have worked on various projects, including web development and mobile app development",
  items: [
    {
      company: "Albayrak Media",
      position: "Mobile App Developer",
      duration: "2024 August - 2024 October",
    }
  ]
};

const education = {
  icon: "/public/assets/assets/resume/cap.svg",
  title: "My Education",
  description: "Training I received and online courses I attended",
  items: [
    {
      institution: "Haliç University",
      degree: "Software Engineering License",
      duration: "2021-2026"
    },
    {
      institution: "Online Course Platform",
      degree: "C# and .NET",
      duration: "2022"
    },
    {
      institution: "Online Course Platform",
      degree: "Mobile App Development with Flutter",
      duration: "2024",
    },
    {
      institution: "Online Course Platform",
      degree: "Advanced Programming with Java",
      duration: "2023"
    },
  ]
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
    { icon: FaPython, name: "Python" }
  ]
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

          <TabsContent value="skills" className="w-full">
            Skills Content
          </TabsContent>

          <TabsContent value="education" className="w-full">
            Education Content
          </TabsContent>

          <TabsContent value="experience" className="w-full">
            Experience Content
          </TabsContent>

          <TabsContent value="about" className="w-full">
            About Me Content
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Resume;
