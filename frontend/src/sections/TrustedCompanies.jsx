export default function TrustedCompanies() {

    const companies = [
        "Google",
        "Microsoft",
        "Amazon",
        "Adobe",
        "Meta",
        "Netflix",
        "Atlassian",
        "Salesforce"
    ];

    return (
        <section className="mt-28">

            <h3 className="text-center text-3xl font-bold text-slate-800">
                Optimize Your Resume for Opportunities at
            </h3>

            <p className="text-center text-slate-600 mt-4 max-w-2xl mx-auto">
                AlignCV helps you tailor your resume for roles at leading technology companies
                by identifying missing skills, ATS keywords, and improvement areas.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-5xl mx-auto mt-14">

                {companies.map((company) => (

                    <div
                        key={company}
                        className="group bg-white border border-slate-200 rounded-2xl py-5 flex items-center justify-center font-semibold text-slate-700 hover:-translate-y-1 hover:border-indigo-500 hover:shadow-xl transition-all duration-300"
                    >
                        <span className="group-hover:scale-105 transition-transform">
                            {company}
                        </span>
                    </div>

                ))}

            </div>

        </section>
    );
}