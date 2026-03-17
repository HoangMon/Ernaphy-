
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhotographyHeroScene, LensScene } from './components/PhotographyScene';
import { PortfolioGallery, ServiceCard } from './components/Gallery';
import { ArrowDown, Menu, X, Camera, Image as ImageIcon, Users, Mail, Instagram, Facebook } from 'lucide-react';

const LoadingScreen = () => {
  const [index, setIndex] = useState(0);
  const phrases = [
    "Mỗi khoảnh khắc là một câu chuyện...",
    "Ánh sáng vẽ nên những kỷ niệm...",
    "Chúng tôi đóng băng thời gian...",
    "Chào mừng bạn đến với Ernaphy."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev < phrases.length - 1 ? prev + 1 : prev));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-[200] bg-lumina-dark flex flex-col items-center justify-center text-white p-6"
    >
      <div className="relative h-20 flex items-center justify-center w-full">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-serif text-xl md:text-3xl italic text-stone-300 text-center absolute"
          >
            {phrases[index]}
          </motion.p>
        </AnimatePresence>
      </div>
      
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 6, ease: "linear" }}
        className="w-48 h-[1px] bg-lumina-gold/30 mt-12 origin-left"
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        className="absolute bottom-12 font-script text-6xl md:text-8xl tracking-tighter select-none pointer-events-none"
      >
        Ernaphy
      </motion.div>
    </motion.div>
  );
};

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, .cursor-pointer, input, textarea');
      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      <motion.div
        className="cursor-follower hidden md:block w-4 h-4 bg-lumina-gold rounded-full"
        animate={{
          x: mousePos.x - 8,
          y: mousePos.y - 8,
          scale: isClicking ? 0.8 : isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? "#D4AF37" : "#FFFFFF"
        }}
        transition={{ type: "spring", damping: 20, stiffness: 250, mass: 0.5 }}
      />
      <motion.div
        className="cursor-follower hidden md:block w-10 h-10 border border-white/30 rounded-full"
        animate={{
          x: mousePos.x - 20,
          y: mousePos.y - 20,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0 : 1
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.8 }}
      />
    </>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 6500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-800 selection:bg-lumina-gold selection:text-white">
      <CustomCursor />
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#FAF9F6]/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img 
              src="/logo.png" 
              alt="Ernaphy Logo" 
              className="h-12 w-auto mix-blend-multiply" 
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const fallback = document.createElement('div');
                  fallback.className = 'text-lumina-dark font-script text-4xl tracking-tighter';
                  fallback.innerText = 'Ernaphy';
                  parent.appendChild(fallback);
                }
              }}
            />
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-[0.2em] text-stone-600">
            <a href="#about" onClick={scrollToSection('about')} className="hover:text-lumina-gold transition-colors cursor-pointer uppercase">Tầm nhìn & Sứ mệnh</a>
            <a href="#services" onClick={scrollToSection('services')} className="hover:text-lumina-gold transition-colors cursor-pointer uppercase">Dịch vụ</a>
            <a href="#portfolio" onClick={scrollToSection('portfolio')} className="hover:text-lumina-gold transition-colors cursor-pointer uppercase">Bộ sưu tập</a>
            <a href="#photographer" onClick={scrollToSection('photographer')} className="hover:text-lumina-gold transition-colors cursor-pointer uppercase">Nhiếp ảnh gia</a>
            <a 
              href="#contact" 
              onClick={scrollToSection('contact')}
              className="px-6 py-2 bg-lumina-dark text-white rounded-full hover:bg-lumina-gold transition-all duration-300 shadow-sm cursor-pointer uppercase"
            >
              Liên hệ
            </a>
          </div>

          <button className="md:hidden text-stone-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#FAF9F6] flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in">
            <a href="#about" onClick={scrollToSection('about')} className="hover:text-lumina-gold transition-colors cursor-pointer uppercase">Tầm nhìn & Sứ mệnh</a>
            <a href="#services" onClick={scrollToSection('services')} className="hover:text-lumina-gold transition-colors cursor-pointer uppercase">Dịch vụ</a>
            <a href="#portfolio" onClick={scrollToSection('portfolio')} className="hover:text-lumina-gold transition-colors cursor-pointer uppercase">Bộ sưu tập</a>
            <a href="#photographer" onClick={scrollToSection('photographer')} className="hover:text-lumina-gold transition-colors cursor-pointer uppercase">Nhiếp ảnh gia</a>
            <a 
              href="#contact" 
              onClick={scrollToSection('contact')}
              className="px-8 py-3 bg-lumina-dark text-white rounded-full shadow-lg cursor-pointer uppercase"
            >
              Liên hệ
            </a>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <PhotographyHeroScene />
        
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(250,249,246,0.8)_0%,rgba(250,249,246,0.4)_50%,rgba(250,249,246,0.2)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block mb-6 px-4 py-1 border border-lumina-gold text-lumina-gold text-[10px] tracking-[0.3em] uppercase font-bold rounded-full backdrop-blur-sm bg-white/30">
            Professional Photography
          </div>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-[10rem] font-medium leading-tight md:leading-[0.8] mb-8 text-stone-900 drop-shadow-sm">
            Ernaphy <br/><span className="italic font-normal text-stone-500 text-4xl md:text-6xl block mt-6">Ghi lại từng khoảnh khắc</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-stone-600 font-light leading-relaxed mb-12">
            Nơi ánh sáng và cảm xúc hòa quyện để tạo nên những tác phẩm nghệ thuật vượt thời gian.
          </p>
          
          <div className="flex justify-center">
             <a href="#about" onClick={scrollToSection('about')} className="group flex flex-col items-center gap-4 text-[10px] font-bold tracking-[0.3em] text-stone-400 hover:text-stone-900 transition-colors cursor-pointer">
                <span>KHÁM PHÁ</span>
                <span className="p-3 border border-stone-200 rounded-full group-hover:border-lumina-gold group-hover:bg-lumina-gold group-hover:text-white transition-all duration-500 bg-white/50">
                    <ArrowDown size={20} />
                </span>
             </a>
          </div>
        </div>
      </header>

      <main>
        {/* About Section */}
        <section id="about" className="py-32 bg-white overflow-hidden">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-5 relative"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                <img src="https://picsum.photos/seed/photographer/800/1066" alt="Photographer" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute -bottom-8 -right-8 w-48 h-48 bg-lumina-gold rounded-2xl -z-10"
              ></motion.div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-7"
            >
              <div className="inline-block mb-4 text-[10px] font-bold tracking-[0.3em] text-lumina-gold uppercase">Tầm nhìn & Sứ mệnh</div>
              <h2 className="font-serif text-5xl mb-8 leading-tight text-stone-900">Tầm nhìn nghệ thuật qua ống kính</h2>
              <div className="w-20 h-1 bg-lumina-gold mb-8"></div>
              <div className="text-lg text-stone-600 leading-relaxed space-y-6">
                <p>
                  <span className="text-6xl float-left mr-4 mt-[-4px] font-serif text-lumina-gold">E</span>rnaphy Studio không chỉ là nơi chụp ảnh, mà là nơi kể những câu chuyện bằng ánh sáng. Chúng tôi tin rằng mỗi bức ảnh là một di sản, một mảnh ký ức được đóng băng mãi mãi trong thời gian.
                </p>
                <p>
                  Với hơn 10 năm kinh nghiệm trong lĩnh vực nhiếp ảnh chuyên nghiệp, chúng tôi tự hào mang đến những góc nhìn độc đáo, từ sự hùng vĩ của thiên nhiên đến nét tinh tế trong tâm hồn con người.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-32 bg-[#FAF9F6]">
            <div className="container mx-auto px-6">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-20"
                >
                    <div className="inline-block mb-4 text-[10px] font-bold tracking-[0.3em] text-lumina-gold uppercase">Dịch vụ</div>
                    <h2 className="font-serif text-5xl text-stone-900">Chúng tôi làm gì?</h2>
                </motion.div>
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.2
                      }
                    }
                  }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                        <ServiceCard 
                            icon={<ImageIcon size={28} />}
                            title="Phong cảnh"
                            description="Ghi lại sự hùng vĩ của thiên nhiên qua những góc nhìn panorama và ánh sáng tự nhiên tuyệt mỹ."
                        />
                    </motion.div>
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                        <ServiceCard 
                            icon={<Camera size={28} />}
                            title="Chân dung"
                            description="Tôn vinh vẻ đẹp cá nhân và cảm xúc chân thực qua những khung hình chân dung nghệ thuật."
                        />
                    </motion.div>
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                        <ServiceCard 
                            icon={<Users size={28} />}
                            title="Kỉ yếu"
                            description="Lưu giữ những khoảnh khắc thanh xuân rực rỡ và tình bạn gắn bó của những năm tháng học trò."
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-32 bg-white">
            <div className="container mx-auto px-6">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-20"
                >
                    <div className="inline-block mb-4 text-[10px] font-bold tracking-[0.3em] text-lumina-gold uppercase">Bộ sưu tập</div>
                    <h2 className="font-serif text-5xl text-stone-900">Tác phẩm tiêu biểu</h2>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                >
                  <PortfolioGallery />
                </motion.div>
            </div>
        </section>

        {/* Showcase Section */}
        <section className="py-32 bg-lumina-dark text-white overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <div className="w-[30rem] h-[30rem] rounded-full bg-lumina-gold blur-[120px] absolute top-[-10rem] left-[-10rem]"></div>
                <div className="w-[30rem] h-[30rem] rounded-full bg-stone-600 blur-[120px] absolute bottom-[-10rem] right-[-10rem]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="relative aspect-square rounded-2xl overflow-hidden border border-white/10"
                     >
                        <LensScene />
                     </motion.div>
                     <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                     >
                        <div className="inline-flex items-center gap-2 px-4 py-1 bg-white/10 text-lumina-gold text-[10px] font-bold tracking-[0.3em] uppercase rounded-full mb-8 border border-white/10">
                            CÔNG NGHỆ & NGHỆ THUẬT
                        </div>
                        <h2 className="font-serif text-5xl md:text-6xl mb-8 text-white">Chất lượng vượt trội</h2>
                        <p className="text-xl text-stone-400 mb-8 leading-relaxed font-light">
                            Chúng tôi sử dụng những thiết bị tối tân nhất kết hợp với kỹ thuật hậu kỳ chuyên sâu để đảm bảo mỗi pixel đều hoàn hảo.
                        </p>
                        <ul className="space-y-6">
                            {[
                                "Thiết bị Full-frame cao cấp",
                                "Ống kính Prime cho độ sắc nét tối đa",
                                "Hệ thống ánh sáng studio di động",
                                "Quy trình hậu kỳ chuyên nghiệp"
                            ].map((item, i) => (
                                <motion.li 
                                    key={i} 
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + (i * 0.1) }}
                                    className="flex items-center gap-4 text-stone-300"
                                >
                                    <div className="w-2 h-2 bg-lumina-gold rounded-full"></div>
                                    <span className="text-lg">{item}</span>
                                </motion.li>
                            ))}
                        </ul>
                     </motion.div>
                </div>
            </div>
        </section>

        {/* Photographer Section */}
        <section id="photographer" className="py-32 bg-[#FAF9F6]">
           <div className="container mx-auto px-6">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-20"
                >
                    <div className="inline-block mb-4 text-[10px] font-bold tracking-[0.3em] text-lumina-gold uppercase">Nhiếp ảnh gia</div>
                    <h2 className="font-serif text-5xl text-stone-900">Người đứng sau ống kính</h2>
                </motion.div>
                
                <div className="flex justify-center">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-col md:flex-row items-center gap-12 max-w-4xl bg-white p-8 md:p-12 rounded-[2rem] border border-stone-100 shadow-xl hover:shadow-2xl transition-all duration-500 group"
                    >
                        <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-lg group-hover:scale-[1.02] transition-transform duration-500">
                            <img src="https://picsum.photos/seed/TuanMinh/800/800" alt="Hoàng Nguyễn Tuấn Minh" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="font-serif text-4xl text-stone-900 mb-2">Hoàng Nguyễn Tuấn Minh</h3>
                            <div className="text-lumina-gold text-xs font-bold tracking-[0.2em] uppercase mb-6">Nhiếp ảnh gia chính & Sáng lập</div>
                            <div className="w-12 h-0.5 bg-lumina-gold mb-6 mx-auto md:mx-0"></div>
                            <p className="text-stone-500 leading-relaxed mb-8 text-lg">
                                Với niềm đam mê mãnh liệt dành cho nghệ thuật thị giác, tôi đã dành hơn một thập kỷ để đi tìm những khoảnh khắc đẹp nhất của cuộc sống. Đối với tôi, nhiếp ảnh không chỉ là công việc, mà là cách tôi giao tiếp với thế giới.
                            </p>
                            <div className="flex justify-center md:justify-start gap-6">
                                <a href="https://www.instagram.com/ernaphy.raw/" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-lumina-gold transition-colors"><Instagram size={24} /></a>
                                <a href="https://www.facebook.com/monbruh" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-lumina-gold transition-colors"><Facebook size={24} /></a>
                                <a href="mailto:pigger0512vn@gmail.com" className="text-stone-400 hover:text-lumina-gold transition-colors"><Mail size={24} /></a>
                            </div>
                        </div>
                    </motion.div>
                </div>
           </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 bg-white">
            <div className="container mx-auto px-6">
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-5xl mx-auto bg-lumina-dark rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
                >
                    <div className="flex-1 p-12 md:p-20">
                        <h2 className="font-serif text-4xl md:text-5xl text-white mb-8">Bắt đầu câu chuyện của bạn</h2>
                        <p className="text-stone-400 mb-12 text-lg">Đừng ngần ngại liên hệ với chúng tôi để được tư vấn về buổi chụp hình mơ ước của bạn.</p>
                        
                        <div className="space-y-8">
                            {[
                                { icon: <Mail size={20} />, text: "pigger0512vn@gmail.com", href: "mailto:pigger0512vn@gmail.com" },
                                { icon: <Instagram size={20} />, text: "@ernaphy.raw", href: "https://www.instagram.com/ernaphy.raw/" },
                                { icon: <Facebook size={20} />, text: "Ernaphy Photography", href: "https://www.facebook.com/monbruh" }
                            ].map((item, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 + (i * 0.1) }}
                                    className="flex items-center gap-6"
                                >
                                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-lumina-gold">
                                        {item.icon}
                                    </div>
                                    <a href={item.href} target={item.href.startsWith('http') ? "_blank" : undefined} rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined} className="text-white text-lg hover:text-lumina-gold transition-colors">{item.text}</a>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 1 }}
                        className="w-full md:w-1/3 bg-lumina-gold p-12 md:p-20 flex flex-col justify-center items-center text-center"
                    >
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-lumina-gold mb-8 shadow-xl">
                            <Camera size={32} />
                        </div>
                        <h3 className="font-serif text-3xl text-lumina-dark mb-6">Đặt lịch ngay</h3>
                        <p className="text-lumina-dark/70 mb-8">Chúng tôi luôn sẵn sàng cho những dự án mới đầy cảm hứng.</p>
                        <button className="px-10 py-4 bg-lumina-dark text-white rounded-full font-bold text-sm tracking-widest uppercase hover:scale-105 transition-transform duration-300 shadow-xl">
                            Gửi yêu cầu
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </section>

      </main>

      <footer className="bg-lumina-dark text-stone-500 py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
                <div className="text-center md:text-left">
                    <img 
                      src="/logo.png" 
                      alt="Ernaphy Logo" 
                      className="h-16 w-auto mb-4 brightness-0 invert" 
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          const fallback = document.createElement('div');
                          fallback.className = 'text-white font-script text-4xl mb-4 tracking-tighter';
                          fallback.innerText = 'Ernaphy';
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                    <p className="text-sm max-w-xs">Ghi lại vẻ đẹp của thế giới qua lăng kính nghệ thuật và sự tận tâm.</p>
                </div>
                <div className="flex gap-8 text-xs font-bold tracking-[0.2em] uppercase">
                    <a href="#about" className="hover:text-white transition-colors">Tầm nhìn & Sứ mệnh</a>
                    <a href="#services" className="hover:text-white transition-colors">Dịch vụ</a>
                    <a href="#portfolio" className="hover:text-white transition-colors">Bộ sưu tập</a>
                </div>
            </div>
            <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] tracking-widest uppercase">
                <p>© 2024 ERNAPHY STUDIO. ALL RIGHTS RESERVED.</p>
                <p>DESIGNED WITH PASSION</p>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

