const skillsList = [
    "Java",
    "JavaScript",
    "Python",
    "C",
    "C++",
    "React",
    "NodeJS",
    "Express",
    "MongoDB",
    "MySQL",
    "SQL",
    "HTML",
    "CSS",
    "Git",
    "GitHub",
    "Docker",
    "AWS",
    "TensorFlow",
    "Keras",
    "Flask",
    "Django",
    "PHP",
    "Machine Learning",
    "Deep Learning",
    "Artificial Intelligence",
    "NLP",
    "Linux",
    "Kubernetes"
];

function matchResume(resume, jobDescription) {

    const jobText = jobDescription.toLowerCase();

    const requiredSkills = [];

    skillsList.forEach(skill => {

        let found = false;

        // Special handling for "C"
        if (skill === "C") {
            found = /\bc\b/i.test(jobDescription);
        }

        // Special handling for "C++"
        else if (skill === "C++") {
            found = /c\+\+/i.test(jobDescription);
        }

        // Special handling for "Node.js"
        else if (skill === "Node.js") {
            found = /node\.?js/i.test(jobDescription);
        }

        // Everything else
        else {
            const regex = new RegExp(
                "\\b" +
                skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") +
                "\\b",
                "i"
            );

            found = regex.test(jobDescription);
        }

        if (found) {
            requiredSkills.push(skill);
        }

    });

    const matchedSkills = [];
    const missingSkills = [];

    requiredSkills.forEach(skill => {

        if (resume.skills.includes(skill)) {
            matchedSkills.push(skill);
        } else {
            missingSkills.push(skill);
        }

    });

    const atsScore =
        requiredSkills.length === 0
            ? 0
            : Math.round(
                (matchedSkills.length / requiredSkills.length) * 100
            );

    const suggestions = [];

    if (missingSkills.length > 0) {
        suggestions.push(
            "Consider adding the missing skills if you have experience with them."
        );
    }

    if (atsScore < 50) {
        suggestions.push(
            "Your resume has a low match with this job description."
        );
    } else if (atsScore < 80) {
        suggestions.push(
            "Your resume is a moderate match but can be improved."
        );
    } else {
        suggestions.push(
            "Your resume is a strong match for this role."
        );
    }

    return {
        atsScore,
        requiredSkills,
        matchedSkills,
        missingSkills,
        suggestions
    };

}

module.exports = matchResume;