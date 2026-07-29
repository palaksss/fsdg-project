require("dotenv").config();

const analyzeResumeWithGemini = require("./services/gemini");

async function test() {

    const resume = {
        name: "Shreyashi",
        skills: [
            "React",
            "NodeJS",
            "Docker",
            "Python"
        ]
    };

    const jd = `
We are hiring a React developer.

Skills:

React
NodeJS
MongoDB
AWS
Git
Docker
`;

    const result = await analyzeResumeWithGemini(
        resume,
        jd
    );

    console.log(result);
}

test();