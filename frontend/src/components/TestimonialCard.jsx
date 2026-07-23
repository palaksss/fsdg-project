import { Star } from "lucide-react";

export default function TestimonialCard({ testimonial }) {
    return (
        <article className="w-80 shrink-0 mx-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl">
            <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                    <Star
                        key={index}
                        size={17}
                        className="fill-amber-400 text-amber-400"
                    />
                ))}
            </div>

            <p className="mt-5 min-h-24 text-sm leading-6 text-slate-600">
                “{testimonial.review}”
            </p>

            <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                <img
                    className="size-11 rounded-full object-cover"
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={44}
                    height={44}
                    loading="lazy"
                />

                <div>
                    <p className="font-semibold text-slate-800">
                        {testimonial.name}
                    </p>

                    <p className="text-xs text-slate-500">
                        {testimonial.role}
                    </p>
                </div>
            </div>
        </article>
    );
}