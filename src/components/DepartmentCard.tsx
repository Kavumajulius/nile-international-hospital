import React, { useState } from 'react';
import { Heart, Star, Activity, Info, Calendar } from 'lucide-react';

interface DepartmentCardProps {
    id: string;
    name: string;
    description: string;
    details?: string;
    image: string;
    onViewDetails: (id: string) => void;
}

export const DepartmentCard: React.FC<DepartmentCardProps> = ({ id, name, description, details, image, onViewDetails }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative bg-white rounded-[32px] overflow-hidden cursor-pointer transition-all duration-500 group flex flex-col h-full"
            style={{
                boxShadow: isHovered
                    ? '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
                    : '0 10px 20px -8px rgba(0, 0, 0, 0.05)'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onViewDetails(id)}
        >
            {/* Image Section - Compacted */}
            <div className="relative h-40 overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
                    }}
                />

                {/* Compact Style badge */}
                <div className="absolute top-4 left-4 z-20">
                    <div className="bg-white/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                        <span className="text-white text-[8px] font-bold uppercase tracking-widest">Active</span>
                    </div>
                </div>

                {/* Blending Gradient - Shorter */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/70 to-transparent" />
            </div>

            {/* Content Section - Compacted */}
            <div className="relative z-10 p-6 flex flex-col flex-1">
                <div className="mb-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 rounded-full mb-3">
                        <Activity className="w-3 h-3 text-white" />
                        <span className="text-white text-[9px] font-bold uppercase tracking-wider">Dept.</span>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-slate-900 leading-tight">
                            {name}
                        </h3>
                        <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <span className="text-xs font-bold text-slate-900">4.9</span>
                        </div>
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                        {description}
                    </p>
                </div>

                {/* Interactive Details - Even more compact */}
                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isHovered ? 'max-h-20 opacity-100 mb-4' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="text-[11px] text-blue-800 leading-relaxed italic bg-blue-50 p-3 rounded-xl border border-blue-100">
                        {details || "24/7 specialist availability and advanced care."}
                    </div>
                </div>

                {/* Small specs row */}
                <div className="flex items-center gap-4 text-slate-400 text-[10px] font-semibold mt-auto pt-2 border-t border-slate-50">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> 24/7</span>
                    <span className="flex items-center gap-1"><Info className="w-3 h-3" /> Medical</span>
                </div>
            </div>
        </div>
    );
};
