"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

interface CTAProps {
    badge?: {
        text: string
    }
    title: React.ReactNode
    description?: string
    action: {
        text: string
        href?: string
        onClick?: () => void
        variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
    }
    withGlow?: boolean
    className?: string
}

function CTAComponent({
    badge,
    title,
    description,
    action,
    withGlow = true,
    className,
}: CTAProps) {
    return (
        <section className={cn("overflow-hidden pt-0 md:pt-0", className)}>
            <div className="relative mx-auto flex max-w-container flex-col items-center gap-6 px-8 py-12 text-center sm:gap-8 md:py-24">
                {/* Badge */}
                {badge && (
                    <Badge
                        variant="outline"
                        className="opacity-0 animate-fade-in-up delay-100 border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 transition-colors"
                    >
                        <span className="mr-2 flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        {badge.text}
                    </Badge>
                )}

                {/* Title */}
                <h2 className="text-3xl font-bold sm:text-5xl lg:text-6xl tracking-tight text-slate-900 opacity-0 animate-fade-in-up delay-200 leading-[1.1]">
                    {title}
                </h2>

                {/* Description */}
                {description && (
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl opacity-0 animate-fade-in-up delay-300">
                        {description}
                    </p>
                )}

                {/* Action Button */}
                <Button
                    onClick={action.onClick}
                    variant={action.variant || "default"}
                    size="lg"
                    className="opacity-0 animate-fade-in-up delay-500 rounded-full h-12 px-8 text-base bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20"
                >
                    <span className="flex items-center gap-2">
                        {action.text}
                        <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                </Button>

                {/* Glow Effect */}
                {withGlow && (
                    <div className="fade-top-lg pointer-events-none absolute inset-0 rounded-2xl shadow-glow opacity-0 animate-scale-in delay-700" />
                )}
            </div>
        </section>
    )
}

interface CTASectionProps {
    onScheduleClick?: () => void;
}

export function CTASection({ onScheduleClick }: CTASectionProps) {
    return (
        <CTAComponent
            badge={{
                text: "Accepting New Patients"
            }}
            title={
                <>
                    Prioritize your health <br className="hidden sm:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                        starts today.
                    </span>
                </>
            }
            description="Experience world-class healthcare with our team of expert specialists. Join thousands of patients who trust Nile International for their medical needs."
            action={{
                text: "Schedule an Appointment",
                onClick: onScheduleClick,
                variant: "default"
            }}
            withGlow={true}
            className="bg-white"
        />
    )
}
