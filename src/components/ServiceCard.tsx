import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
    title: string;
    description: string;
    image: string;
    onViewDetails?: () => void;
}

export const ServiceCard = ({ title, description, image, onViewDetails }: ServiceCardProps) => {
    return (
        <div onClick={onViewDetails} className="relative h-[240px] w-full rounded-3xl overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-500 bg-slate-900 flex cursor-pointer">
            {/* Right Image Section - Background layer */}
            <div className="absolute top-0 right-0 w-[65%] h-full z-0 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
                    }}
                />
                {/* The "Perfect Blend" Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent z-10" />
            </div>

            {/* Left Content Section - Text layer on top */}
            <div className="relative z-20 w-[60%] px-6 py-5 flex flex-col items-center text-center bg-gradient-to-r from-slate-900 via-slate-900 to-transparent h-full justify-between">
                <div className="w-full flex flex-col items-center pt-2">
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 leading-tight">
                        {title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed line-clamp-2 max-w-[280px]">
                        {description}
                    </p>
                </div>

                <div className="w-full flex flex-col items-center pb-1">
                    <div className="mb-3">
                        <span className="text-white font-bold text-[11px] uppercase tracking-wider block">Everyday Support</span>
                        <div className="text-[10px] text-slate-400">Available 24/7</div>
                    </div>

                    <button className="mx-auto w-fit bg-white text-slate-900 px-8 py-2.5 rounded-full text-xs font-bold hover:bg-slate-100 transition-colors shadow-md active:scale-95 whitespace-nowrap">
                        Check Availability
                    </button>
                </div>
            </div>
        </div>
    );
};
