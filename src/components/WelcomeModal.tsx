"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, Calendar, MessageCircle, ArrowRight } from "lucide-react";

interface WelcomeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
    // Internal state removed, now controlled by props

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-30 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-colors"
                        >
                            <X size={20} className="text-slate-500 md:text-white" />
                        </button>

                        {/* Left Side: Visual */}
                        <div className="w-full md:w-1/2 relative h-48 md:h-auto bg-slate-900">
                            <img
                                src="/doctor_care.png"
                                alt="Nile International Hospital"
                                className="absolute inset-0 w-full h-full object-cover opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 text-white max-w-[80%]">
                                <p className="text-sm font-medium text-blue-300 mb-1">World-Class Care</p>
                                <h3 className="text-2xl font-bold leading-tight">
                                    Your Health, <br /> Our Priority.
                                </h3>
                            </div>
                        </div>

                        {/* Right Side: Content */}
                        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center bg-white relative">
                            <div className="mb-8">
                                <h4 className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-2">
                                    Welcome to Nile International
                                </h4>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                    Here for You, 24/7
                                </h2>
                                <p className="text-slate-600 leading-relaxed">
                                    Whether you need emergency care, a specialist consultation, or a routine check-up, our team is ready to serve you with presidential-standard healthcare.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <a
                                    href="https://wa.me/256709996699"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 w-full py-3.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-green-600/20 group"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="w-5 h-5 fill-white group-hover:scale-110 transition-transform"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.394 0 12.03c0 2.122.554 4.194 1.607 6.034L0 24l6.117-1.605a11.803 11.803 0 005.925 1.573h.005c6.632 0 12.03-5.394 12.033-12.03a11.75 11.75 0 00-3.526-8.51" />
                                    </svg>
                                    <span>Chat on WhatsApp</span>
                                </a>

                                <a
                                    href="tel:+256706202590"
                                    className="flex items-center justify-center gap-3 w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-all shadow-lg shadow-slate-900/10 group"
                                >
                                    <Phone className="w-5 h-5 group-hover:animate-pulse" />
                                    <span>Emergency: +256 706 202590</span>
                                </a>

                                <div className="grid grid-cols-2 gap-3">
                                    <a
                                        href="mailto:info@nih.co.ug"
                                        className="flex items-center justify-center gap-2 py-3.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl font-semibold transition-all"
                                    >
                                        <Mail className="w-4 h-4" />
                                        <span>Email Us</span>
                                    </a>
                                    <a
                                        href="#contact"
                                        onClick={onClose}
                                        className="flex items-center justify-center gap-2 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-all group"
                                    >
                                        <span>Book Now</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>

                            <p className="mt-8 text-xs text-center text-slate-400">
                                Nile International Hospital • Jinja City, Uganda
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
