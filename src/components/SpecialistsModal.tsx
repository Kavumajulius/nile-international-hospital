"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Quote, Activity } from "lucide-react";
import { hospitalData } from "../data/hospitalData";

interface SpecialistsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SpecialistsModal = ({ isOpen, onClose }: SpecialistsModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.95 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none"
                    >
                        <div className="bg-slate-50 w-full max-w-7xl h-[90vh] rounded-[32px] overflow-hidden shadow-2xl pointer-events-auto flex flex-col relative">
                            {/* Header */}
                            <div className="bg-white px-8 py-6 border-b border-slate-100 flex items-center justify-between shrink-0">
                                <div>
                                    <h2 className="text-3xl font-display font-bold text-slate-900">Our Specialists</h2>
                                    <p className="text-slate-500 mt-1">Meet the expert team dedicated to your care</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-3 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors text-slate-600"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Scrollable List */}
                            <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
                                <div className="space-y-16 max-w-6xl mx-auto pb-12">
                                    {hospitalData.specialists.map((specialist, idx) => (
                                        <div
                                            key={specialist.id}
                                            className={`relative max-w-4xl ${idx % 2 === 1 ? 'ml-auto lg:mr-12' : 'lg:ml-12'}`}
                                        >
                                            <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 group">
                                                <div className="grid lg:grid-cols-2 gap-0">
                                                    <div className={`relative p-12 lg:p-14 flex flex-col justify-center ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                                                        <div className="text-7xl font-serif text-slate-100 leading-none mb-4">"</div>

                                                        <p className="text-xl lg:text-2xl font-medium text-slate-800 mb-8 leading-relaxed italic">
                                                            {specialist.quote}
                                                        </p>

                                                        <div>
                                                            <p className="text-lg font-bold mb-1 text-slate-900">{specialist.name}</p>
                                                            <p className="text-sm text-blue-600 font-bold uppercase tracking-wider mb-1">{specialist.role}</p>
                                                            <p className="text-sm text-slate-500 font-medium">{specialist.stat}</p>
                                                        </div>
                                                    </div>

                                                    <div className={`relative h-[400px] lg:h-auto ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                                                        <img
                                                            src={specialist.image}
                                                            alt={specialist.name}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                e.currentTarget.src = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
