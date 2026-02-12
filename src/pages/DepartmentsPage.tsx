import { Activity, ArrowLeft } from 'lucide-react';
import { hospitalData } from '../data/hospitalData';
import { DepartmentCard } from '../components/DepartmentCard';
import { useState } from 'react';
import { DepartmentModal } from '../components/DepartmentModal';

interface DepartmentsPageProps {
    onBack: () => void;
    onOpenWelcome?: () => void;
}

export const DepartmentsPage = ({ onBack, onOpenWelcome }: DepartmentsPageProps) => {
    const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);
    const selectedDepartment = hospitalData.departments.find(d => d.id === selectedDepartmentId);

    return (
        <main className="min-h-screen w-full bg-[#f8f9fa] font-sans text-slate-800">
            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 z-50 px-4 lg:px-12 py-4">
                <div className="max-w-[1400px] mx-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-lg px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded-lg">
                            <Activity className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight">
                            Nile International <span className="text-blue-600">Hospital</span>
                        </div>
                    </div>

                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-bold transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Home
                    </button>
                </div>
            </header>

            {/* Hero / Introduction */}
            <section className="pt-40 pb-16 px-6 lg:px-12 bg-white">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-bold mb-6">
                        <Activity className="w-4 h-4" />
                        <span>Excellence in Care</span>
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-slate-900 leading-tight">
                        Our Medical <span className="text-blue-600">Departments</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Nile International Hospital offers world-class expertise across a wide range of specialized medical fields.
                        Discover our centers of excellence and the advanced treatments we provide.
                    </p>
                </div>
            </section>

            {/* Departments Grid - FULL LIST */}
            <section className="py-20 px-6 lg:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {hospitalData.departments.map((dept) => (
                            <DepartmentCard
                                key={dept.id}
                                id={dept.id}
                                name={dept.name}
                                description={dept.description}
                                details={dept.details}
                                image={dept.image || '/hospital_hero.png'}
                                onViewDetails={setSelectedDepartmentId}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer-like CTA */}
            <section className="py-24 bg-blue-900 text-white px-6 lg:px-12">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to Book an Appointment?</h2>
                    <p className="text-xl text-blue-100 mb-10 leading-relaxed">
                        Our specialists are available to provide you with the best medical care.
                        Contact us today to schedule your visit.
                    </p>
                    <button
                        onClick={onBack}
                        className="bg-white text-blue-900 font-bold py-4 px-10 rounded-2xl text-lg hover:bg-blue-50 transition-colors shadow-xl"
                    >
                        Contact Nile International
                    </button>
                </div>
            </section>

            {/* Modals */}
            <DepartmentModal
                isOpen={!!selectedDepartment}
                onClose={() => setSelectedDepartmentId(null)}
                department={selectedDepartment}
                onBookAvailability={() => {
                    setSelectedDepartmentId(null);
                    onOpenWelcome?.();
                }}
            />
        </main>
    );
};
