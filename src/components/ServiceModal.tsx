import { X, ShieldCheck } from 'lucide-react';

interface ServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    service: any; // Using any for simplicity with the data structure
    onBookAvailability?: () => void;
}

export const ServiceModal = ({ isOpen, onClose, service, onBookAvailability }: ServiceModalProps) => {
    if (!isOpen || !service) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col">

                {/* Header Image */}
                <div className="relative h-64 flex-shrink-0">
                    <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full backdrop-blur-md transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="absolute bottom-0 left-0 p-8">
                        <h2 className="text-3xl font-bold text-white mb-2">{service.title}</h2>
                        <div className="flex items-center gap-2 text-white/90">
                            <ShieldCheck className="w-5 h-5" />
                            <span className="font-medium">Specialized Service</span>
                        </div>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="p-8 overflow-y-auto">
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-slate-900 mb-3">Service Overview</h3>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            {service.fullDescription || service.description}
                        </p>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 flex-shrink-0">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl text-slate-600 font-medium hover:bg-slate-200 transition-colors"
                    >
                        Close
                    </button>
                    <button onClick={onBookAvailability} className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                        Book Availability
                    </button>
                </div>

            </div>
        </div>
    );
};
