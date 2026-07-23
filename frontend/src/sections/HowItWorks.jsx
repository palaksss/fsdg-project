import { SparklesIcon } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import { howItWorksData } from "../data/howItWorksData";

export default function HowItWorks() {
    return (
        <>
            <SectionTitle
                text1="How It Works"
                text2="Optimize Your Resume in Four Simple Steps"
                text3="AlignCV analyzes your resume against any job description and provides AI-powered insights to improve your chances of passing Applicant Tracking Systems."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-16">
                {howItWorksData.map((plan, index) => {
                    const PlanIcon = plan.icon;

                    return (
                        <div
                            key={index}
                            className={`p-6 rounded-2xl w-full shadow-[0px_4px_26px] shadow-black/6 ${
                                plan.mostPopular
                                    ? "relative pt-12 bg-gradient-to-b from-indigo-600 to-violet-600"
                                    : "bg-white"
                            }`}
                        >
                            {plan.mostPopular && (
                                <div className="absolute top-4 right-4 flex items-center gap-1 rounded bg-white px-2 py-1.5 text-xs font-medium text-indigo-600">
                                    <SparklesIcon size={14} />
                                    <p>Recommended</p>
                                </div>
                            )}

                            <p className={plan.mostPopular ? "text-white" : "text-slate-800"}>
                                {plan.title}
                            </p>

                            <div className="mt-4">
                                <PlanIcon
                                    size={42}
                                    className={
                                        plan.mostPopular ? "text-white" : "text-indigo-600"
                                    }
                                />
                            </div>

                            <hr
                                className={`my-8 ${
                                    plan.mostPopular
                                        ? "border-white/30"
                                        : "border-slate-200"
                                }`}
                            />

                            <div
                                className={`space-y-3 ${
                                    plan.mostPopular ? "text-white" : "text-slate-500"
                                }`}
                            >
                                {plan.features.map((feature, featureIndex) => {
                                    const FeatureIcon = feature.icon;

                                    return (
                                        <div
                                            key={featureIndex}
                                            className="flex items-start gap-2"
                                        >
                                            <FeatureIcon
                                                size={18}
                                                className={`mt-0.5 shrink-0 ${
                                                    plan.mostPopular
                                                        ? "text-white"
                                                        : "text-indigo-600"
                                                }`}
                                            />

                                            <span>{feature.name}</span>
                                        </div>
                                    );
                                })}
                            </div>

                            <div
                                className={`mt-8 w-full rounded-lg py-3 text-center font-medium ${
                                    plan.mostPopular
                                        ? "bg-white text-slate-800"
                                        : "bg-indigo-50 text-indigo-700"
                                }`}
                            >
                                {plan.buttonText}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}