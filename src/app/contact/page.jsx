"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FaEnvelope } from 'react-icons/fa';
import { motion } from "framer-motion";
import { db } from "./firebase"; // Firebase dosyasını import et
import { collection, addDoc } from "firebase/firestore"; // Firestore fonksiyonları

const info = [
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "tahaglbz1@gmail.com"
  }
];

const Contact = () => {
  // Form verilerini tutmak için state
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  // Input değişikliklerini işlemek
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form submit işlemi ve doğrulama
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Boş input kontrolü
    if (!formData.firstname || !formData.lastname || !formData.email || !formData.phone || !formData.service || !formData.message) {
      window.alert("Lütfen tüm alanları doldurun!");
      return; // Formu gönderme işlemini durdur
    }

    try {
      // Firestore'a veri gönderme
      await addDoc(collection(db, "contacts"), formData);
      
      // Başarıyla gönderildiğinde pop-up göster
      window.alert("Mesaj başarıyla gönderildi!");

      // Formu resetleme
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    } catch (error) {
      // Hata durumunda pop-up göster
      window.alert("Mesaj gönderilirken hata oluştu, lütfen tekrar deneyin.");
      console.error("Veri gönderme hatası: ", error);
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1, transition: { delay: 2.4, duration: 0.4, ease: "easeIn" } }} 
      className="py-6"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px] xl:gap-12">
          <div className="xl:w-1/2 order-2 xl:order-none">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl">
              <h3 className="text-4xl text-accent">Let&apos;s work together</h3>
              <p className="text-white/60">You can send your offers and requests</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input name="firstname" type="text" placeholder="Firstname" value={formData.firstname} onChange={handleChange} />
                <Input name="lastname" type="text" placeholder="Lastname" value={formData.lastname} onChange={handleChange} />
                <Input name="email" type="email" placeholder="Email address" value={formData.email} onChange={handleChange} />
                <Input name="phone" type="text" placeholder="Phone number" value={formData.phone} onChange={handleChange} />
              </div>
              <Select onValueChange={(value) => setFormData({ ...formData, service: value })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="web">Web Development</SelectItem>
                    <SelectItem value="mob">Mobile App Development</SelectItem>
                    <SelectItem value="desk">Desktop App Development</SelectItem>
                    <SelectItem value="db">Database Design</SelectItem>
                    <SelectItem value="oth">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Textarea name="message" className="h-[200px]" placeholder="Type your message here" value={formData.message} onChange={handleChange} />
              <Button type="submit" size="md" className="max-w-40">Send Message</Button>
            </form>
          </div>

          <div className="xl:w-1/2 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
            <ul className="flex flex-col gap-10">
              {info.map((item, index) => (
                <li key={index} className="flex items-center gap-6">
                  <div className="w-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                    <div className="text-[28px]">{item.icon}</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-white/60">{item.title}</p>
                    <h3 className="text-xl">{item.description}</h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
