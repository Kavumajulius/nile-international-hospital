"use client";

import { motion } from "framer-motion";
import { hospitalData } from "../data/hospitalData";
import { ShieldCheck, Activity, Heart, Clock } from "lucide-react";

// Map features to images and icons
// Ideally this would be in the data file, but mapping here for the specific UI request
const featuresWithAssets = hospitalData.about.features.map((feature, index) => {
    let image = "";
    let Icon = Activity;

    switch (index) {
        case 0:
            image = "/dept_radiology.png";
            Icon = Activity;
            break;
        case 1:
            image = "/doctor_care.png";
            Icon = Heart;
            break;
        case 2:
            image = "/hospital_hero.png";
            Icon = Clock;
            break;
        case 3:
            image = "https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
            Icon = ShieldCheck;
            break;
        default:
            image = "/hospital_hero.png";
    }

    return {
        ...feature,
        image,
        Icon,
        side: index % 2 === 0 ? "left" : "right"
    };
});

interface AboutSectionProps {
    onImageClick?: () => void;
}

export const AboutSection = ({ onImageClick }: AboutSectionProps) => {
    return (
        <section id="what-we-do" className="py-24 md:py-32 bg-gradient-to-b from-white via-sky-50 to-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-8 md:px-16 space-y-32">
                {/* Header */}
                <div className="text-center mb-20 max-w-4xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight text-slate-900"
                    >
                        {hospitalData.about.title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-slate-600 leading-relaxed"
                    >
                        {hospitalData.about.content}
                    </motion.p>
                </div>

                {/* Steps */}
                {featuresWithAssets.map((step, index) => {
                    const isLeft = step.side === "left";

                    return (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center"
                        >
                            {/* Text Content */}
                            <div className={`${isLeft ? 'md:order-1' : 'md:order-2'} text-center md:text-left`}>
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sky-100 text-sky-600 mb-6">
                                    <step.Icon className="w-6 h-6" />
                                </div>
                                <div className="font-mono text-xs font-bold uppercase tracking-widest mb-4 text-sky-500 block">
                                    Value 0{index + 1}
                                </div>
                                <h3 className="font-display text-4xl md:text-5xl font-bold text-black leading-tight mb-6 tracking-tight">
                                    {step.title}
                                </h3>
                                <p className="font-sans text-lg text-slate-600 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>

                            {/* Animated Image Card */}
                            <div className={`${isLeft ? 'md:order-2' : 'md:order-1'} relative`}>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.4 }}
                                    onClick={onImageClick}
                                    className="relative h-[300px] md:h-[400px] rounded-[32px] overflow-hidden shadow-2xl border-4 border-white cursor-pointer"
                                >
                                    <img
                                        src={step.image}
                                        alt={step.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                                    {/* Floating Badge */}
                                    <div className={`absolute bottom-6 ${isLeft ? 'left-6' : 'right-6'} bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-bold text-slate-800 shadow-lg`}>
                                        Nile International
                                    </div>
                                </motion.div>

                                {/* Decorative elements */}
                                <div className={`absolute -z-10 top-10 ${isLeft ? '-right-10' : '-left-10'} w-full h-full border-2 border-sky-200 rounded-[40px] hidden md:block`} />
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};
