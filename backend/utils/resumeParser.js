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

function parseResume(text) {

    const lines = text
        .split("\n")
        .map(line => line.trim())
        .filter(line => line !== "");

    const name = lines[0] || "";

    const emailMatch = text.match(
        /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/
    );

    const email = emailMatch ? emailMatch[0] : "";

    const phoneMatch = text.match(
        /(\+?\d[\d\s-]{8,}\d)/
    );

    const phone = phoneMatch ? phoneMatch[0] : "";

    const foundSkills = [];

    skillsList.forEach(skill => {
        if (text.toLowerCase().includes(skill.toLowerCase())) {
            foundSkills.push(skill);
        }
    });

    return {
        name,
        email,
        phone,
        skills: foundSkills
    };
}

module.exports = parseResume;