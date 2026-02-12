"use client";

import { motion } from "framer-motion";
import { hospitalData } from "../data/hospitalData";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface InsuranceSectionProps {
    onContactClick?: () => void;
}

export const InsuranceSection = ({ onContactClick }: InsuranceSectionProps) => {
    return (
        <section id="insurance" className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-3xl opacity-30" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-3xl opacity-30" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Side: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-left"
                    >
                        <p className="uppercase text-sm font-bold text-blue-400 tracking-wider mb-2">
                            Insurance Partners
                        </p>
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display leading-tight">
                            {hospitalData.insurance.title}
                        </h2>
                        <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-lg">
                            {hospitalData.insurance.content}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button
                                onClick={onContactClick}
                                className="bg-blue-600 text-white hover:bg-blue-700 font-bold px-8 py-6 rounded-xl text-md shadow-lg hover:scale-105 transition-transform"
                            >
                                Contact Us
                            </Button>
                            <Button
                                variant="outline"
                                className="border-slate-700 bg-transparent text-white hover:bg-slate-800 hover:text-white px-8 py-6 rounded-xl text-md font-medium"
                                asChild
                            >
                                <a href="#departments">
                                    View Departments <ArrowRight className="ml-2 w-4 h-4" />
                                </a>
                            </Button>
                        </div>
                    </motion.div>

                    {/* Right Side: Integrations/Logos Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="grid grid-cols-4 gap-4"
                    >
                        {hospitalData.insurance.partners.map((partner, index) => (
                            <motion.div
                                key={partner.name}
                                onClick={onContactClick}
                                whileHover={{ y: -5, scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="relative aspect-square bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer border border-slate-100/10"
                            >
                                <div className="absolute inset-0 flex items-center justify-center p-4">
                                    {partner.image ? (
                                        <img
                                            src={partner.image}
                                            alt={`${partner.name} logo`}
                                            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="text-center w-full h-full flex flex-col items-center justify-center">
                                            <div className={`text-[10px] md:text-xs font-bold font-display text-slate-900 leading-tight`}>
                                                {partner.name.split(' ')[0]}
                                            </div>
                                            {partner.name.split(' ').length > 1 && (
                                                <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                                                    {partner.name.split(' ').slice(1).join(' ')}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
