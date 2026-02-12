import { DottedSurface } from "@/components/ui/dotted-surface";

export const HighlightSection = () => {
    return (
        <section className="relative w-full py-20 lg:py-32 bg-white overflow-hidden">
            {/* Animated dotted surface background */}
            <DottedSurface className="absolute inset-0" />

            {/* Text overlay */}
            <div className="relative z-10 container mx-auto px-4 text-center mb-40">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%]"
                    style={{
                        background: 'radial-gradient(circle closest-side, rgba(59,130,246,0.08), transparent 100%)',
                    }}
                />
                <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                    We keep you on <span className="text-blue-600">top</span> and <span className="text-blue-600">healthy</span>
                </h1>
            </div>
        </section>
    );
};
