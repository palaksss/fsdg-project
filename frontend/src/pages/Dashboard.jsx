export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-10">
      <h1 className="text-4xl font-bold mb-8">
        Resume Analyzer Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="font-semibold text-xl mb-4">
            Upload Resume
          </h2>

          <input type="file" />
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="font-semibold text-xl mb-4">
            Paste Job Description
          </h2>

          <textarea
            className="w-full border p-3 rounded-lg"
            rows="8"
          />
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="font-semibold text-xl">
            ATS Score
          </h2>

          <p className="text-5xl font-bold text-indigo-600 mt-4">
            84%
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="font-semibold text-xl mb-4">
            Missing Keywords
          </h2>

          <ul className="space-y-2">
            <li>Docker</li>
            <li>AWS</li>
            <li>Kubernetes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}