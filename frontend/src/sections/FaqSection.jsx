import { ChevronDown } from "lucide-react";
import { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import { faqsData } from "../data/faqsData";

export const FaqSection = () => {
    const [openIndex, setOpenIndex] = useState(null);
    return (
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center px-4 md:px-0">
            <SectionTitle
                text1="FAQs"
                text2="Everything You Need to Know About AlignCV"
                text3="Find answers to common questions about resume analysis, ATS scoring, and how AlignCV helps you optimize your resume for your dream job."
            />
            <div className="mt-12 w-full">
                {faqsData.map((faq, index) => (
                    <div className="border-b border-slate-200 py-5 cursor-pointer w-full hover:bg-slate-50 transition-colors duration-200 rounded-lg px-2" key={index} onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-medium">
                                {faq.question}
                            </h3>
                            <ChevronDown size={18} className={`${openIndex === index && "rotate-180"} transition-all duration-500 ease-in-out`} />
                        </div>
                        <p className={`text-sm text-slate-500 transition-all duration-500 ease-in-out max-w-xl ${openIndex === index ? "opacity-100 max-h-[500px] translate-y-0 pt-4" : "opacity-0 max-h-0 overflow-hidden -translate-y-2"}`} >
                            {faq.answer}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};