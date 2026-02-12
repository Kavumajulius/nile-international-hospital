import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import clsx from "clsx";

export const VideoSection = () => {
    const [lang, setLang] = useState<"en" | "lg">("en");
    const containerRef = useRef(null);
    const videoContainerRef = useRef(null);
    const isSectionInView = useInView(containerRef, { once: true, margin: "-100px" });
    const isVideoInView = useInView(videoContainerRef, { margin: "0px" });
    const [shouldPlay, setShouldPlay] = useState(false);

    useEffect(() => {
        setShouldPlay(isVideoInView);
    }, [isVideoInView]);

    const videoSrc = `https://www.youtube.com/embed/swNYqqqw3L0?rel=0&modestbranding=1&mute=1&autoplay=${shouldPlay ? 1 : 0}&loop=1&playlist=swNYqqqw3L0`;

    return (
        <section id="demo" ref={containerRef} className="py-24 md:py-32 px-5 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="text-sky-500 text-sm font-mono font-bold uppercase tracking-widest mb-4">
                        COMPASSION IN ACTION
                    </div>
                    <h2 className="font-display text-4xl md:text-6xl font-semibold text-black leading-[1.1] tracking-tight mb-8">
                        Pioneering <span className="text-blue-600 italic">Quality Healthcare</span>
                    </h2>
                </motion.div>

                {/* Tab Switcher */}
                <div className="flex justify-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-flex bg-gray-100 p-1.5 rounded-full border border-gray-200"
                    >
                        <button
                            onClick={() => setLang("en")}
                            className={clsx(
                                "px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 font-sans relative",
                                lang === "en"
                                    ? "bg-blue-600 text-white shadow-lg"
                                    : "text-gray-600 hover:text-black"
                            )}
                        >
                            English
                        </button>
                        <button
                            onClick={() => setLang("lg")}
                            className={clsx(
                                "px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 font-sans relative",
                                lang === "lg"
                                    ? "bg-blue-600 text-white shadow-lg"
                                    : "text-gray-600 hover:text-black"
                            )}
                        >
                            Luganda
                        </button>
                    </motion.div>
                </div>

                {/* Video Frame */}
                <motion.div
                    ref={videoContainerRef}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="w-full aspect-[16/9] bg-slate-900 rounded-[32px] md:rounded-[44px] overflow-hidden border border-white/10 shadow-2xl relative group"
                >
                    {/* Decorative corners */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/20 rounded-tl-lg z-20 pointer-events-none" />
                    <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/20 rounded-tr-lg z-20 pointer-events-none" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/20 rounded-bl-lg z-20 pointer-events-none" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/20 rounded-br-lg z-20 pointer-events-none" />

                    {/* YouTube Iframe */}
                    <iframe
                        key={`${lang}-${shouldPlay}`} // Force re-render on language change or Play state chance to restart video
                        className="absolute inset-0 w-full h-full"
                        src={videoSrc}
                        title="Nile International Hospital Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </motion.div>
            </div>
        </section>
    );
}
