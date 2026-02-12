import { X, Clock, MapPin, Phone, ShieldCheck } from 'lucide-react';

interface DepartmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    department: any; // Using any for simplicity with the data structure, but ideally typed
    onBookAvailability?: () => void;
}

export const DepartmentModal = ({ isOpen, onClose, department, onBookAvailability }: DepartmentModalProps) => {
    if (!isOpen || !department) return null;

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
                        src={department.image}
                        alt={department.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full backdrop-blur-md transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="absolute bottom-0 left-0 p-8">
                        <h2 className="text-3xl font-bold text-white mb-2">{department.name}</h2>
                        <div className="flex items-center gap-2 text-white/90">
                            <ShieldCheck className="w-5 h-5" />
                            <span className="font-medium">Specialized Department</span>
                        </div>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="p-8 overflow-y-auto">
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-slate-900 mb-3">Overview</h3>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            {department.description}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-blue-100 p-2 rounded-lg">
                                    <Clock className="w-5 h-5 text-blue-600" />
                                </div>
                                <h4 className="font-bold text-slate-900">Opening Hours</h4>
                            </div>
                            <p className="text-slate-600 text-sm">
                                {department.details.includes("Open") ?
                                    department.details.split("Clinic Open:")[1] || "Mon - Sat: 9:00 AM - 5:30 PM"
                                    : "Mon - Sat: 9:00 AM - 5:30 PM (Check specific schedule)"}
                            </p>
                        </div>

                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-green-100 p-2 rounded-lg">
                                    <Phone className="w-5 h-5 text-green-600" />
                                </div>
                                <h4 className="font-bold text-slate-900">Contact</h4>
                            </div>
                            <p className="text-slate-600 text-sm">
                                +256 000 000 000
                                <br />
                                <span className="text-xs text-slate-400">Direct Line Available</span>
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-3">Department Details</h3>
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
                            <p className="text-slate-700 italic">
                                "{department.details}"
                            </p>
                        </div>
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
