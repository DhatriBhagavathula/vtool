// script.js
// Check if user is logged in
const currentPage = window.location.pathname;
if (!localStorage.getItem("userEmail") && !currentPage.includes("index.html")) {
  alert("Please log in first.");
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
    const domainSelect = document.getElementById("domain-select");

    const domainQuestions = {
        general: [
            "Tell me about yourself.",
            "Why do you want to work at our company?",
            "Why should we hire you?",
            "What are your strengths and weaknesses?",
            "Where do you see yourself in 5 years?",
            "What motivates you?",
            "How do you handle stress or pressure?",
            "Do you prefer working in a team or alone? Why?",
            "Tell us about a project you’ve worked on.",
            "What was your favorite subject in college and why?",
            "Have you participated in any extracurricular or leadership activities?",
            "Explain a technical concept you recently learned.",
            "What programming languages/tools are you comfortable with?",
            "Can you explain your final year project?",
            "How do you stay updated with new technologies?",
            "If you’re given a task you don’t know how to do, what will you do?",
            "How would you manage multiple tasks with tight deadlines?",
            "Have you ever had a conflict with a teammate or manager? How did you resolve it?",
            "Tell me about a time you faced a challenge and how you overcame it."
        ],

            
        programming: [
            "What is a variable?",
            "What are data types?",
            "What is the difference between a compiler and an interpreter?",
            "What is a function?",
            "What are conditional statements?",
            "What is a loop?",
            "What is recursion?",
            "What is the difference between a while loop and a for loop?",
            "What is an array?",
            "What is a string?",
            "What is the difference between pass by value and pass by reference?",
            "What is scope in programming?",
            "What is a pointer (in C/C++)?",
            "What are the different types of errors in a program?",
            "What are operators and how are they used?",
            "What is exception handling?",
            "What are the advantages of using functions?",
            "What is a switch-case statement?",
            "What is typecasting?",
            "What is the difference between static and dynamic typing?",
            "What is a module/package?",
            "What is a lambda function?",
            "What is a loop break and continue?",
            "How do you take input from a user?",
            "What is the difference between mutable and immutable data types?"
            
            
        ],
        dsa: [
            "What is a data structure?",
            "What is an array?",
            "What is a linked list?",
            "What is a stack?",
            "What is a queue?",
            "What is a deque?",
            "What is a hash table?",
            "What is a binary tree?",
            "What is a binary search tree?",
            "What is a graph?",
            "What is a heap?",
            "What is recursion?",
            "What is the difference between linear and binary search?",
            "What are common sorting algorithms?",
            "What is time complexity?",
            "What is Big O notation?",
            "What is space complexity?",
            "What is a circular linked list?",
            "What is depth-first search?",
            "What is breadth-first search?",
            "What is dynamic programming?",
            "What is backtracking?",
            "What is memoization?",
            "What is a greedy algorithm?",
            "What is the difference between array and linked list?"
        ],

        oop: [
            "What is OOP?",
            "What is a class?",
            "What is an object?",
            "What is encapsulation?",
            "What is abstraction?",
            "What is inheritance?",
            "What is polymorphism?",
            "What is method overloading?",
            "What is method overriding?",
            "What is constructor?",
            "What is destructor?",
            "What is the difference between public, private, and protected?",
            "What is the use of the this keyword?",
            "What is a static method?",
            "What is an interface?",
            "What is the difference between class and interface?",
            "What is multiple inheritance?",
            "What is a virtual function?",
            "What is the difference between composition and aggregation?",
            "What is the SOLID principle?",
            "What is the difference between abstract class and interface?",
            "What is dependency injection?",
            "What is encapsulation and how is it implemented?",
            "What is the difference between shallow copy and deep copy?",
            "What is object slicing?"
        ],
        dbms: [

            "What is a database?",
            "What is DBMS?",
            "What is SQL?",
            "What is a table?",
            "What are primary and foreign keys?",
            "What is normalization?",
            "What is denormalization?",
            "What are joins in SQL?",
            "What is a subquery?",
            "What is a view?",
            "What is a trigger?",
            "What is an index?",
            "What is ACID property?",
            "What are the different types of SQL commands (DDL, DML, DCL, TCL)?",
            "What is the difference between DELETE and TRUNCATE?",
            "What is a constraint?",
            "What is the difference between WHERE and HAVING?",
            "What is a stored procedure?",
            "What is a cursor?",
            "What is a transaction?",
            "What is the difference between clustered and non-clustered indexes?",
            "What is a NoSQL database?",
            "What are the types of NoSQL databases?",
            "What is MongoDB?",
            "What is the difference between SQL and NoSQL?"
            

        ],
        web: [
            "What is HTML?",
            "What are semantic HTML tags?",
            "What is CSS?",
            "What is the difference between inline, internal, and external CSS?",
            "What is the box model in CSS?",
            "What is Flexbox?",
            "What is JavaScript?",
            "What is the DOM?",
            "What is the difference between == and === in JavaScript?",
            "What is event bubbling?",
            "What is an API?",
            "What is AJAX?",
            "What is JSON?",
            "What is responsive web design?",
            "What is the difference between GET and POST?",
            "What is a cookie and a session?",
            "What is local storage?",
            "What is a promise in JavaScript?",
            "What is async/await?",
            "What is CORS?",
            "What is a framework? Name some frontend frameworks.",
            "What is React?",
            "What is a component in React?",
            "What is a single-page application (SPA)?",
            "What is the difference between frontend and backend?"


     ],

    os: [
        "What is an operating system?",
        "What are the main functions of an operating system?",
        "What is the difference between a process and a thread?",
        "What is a kernel?",
        "What is multitasking?",
        "What is the difference between multitasking, multiprocessing, and multithreading?",
        "What is a deadlock?",
        "What are the necessary conditions for a deadlock to occur?",
        "What is context switching?",
        "What is scheduling?",
        "What are different types of CPU scheduling algorithms?",
        "What is the difference between preemptive and non-preemptive scheduling?",
        "What is a race condition?",
        "What are semaphores?",
        "What is virtual memory?",
        "What is paging?",
        "What is segmentation?",
        "What is demand paging?",
        "What is thrashing?",
        "What is memory management?",
        "What is a file system?",
        "What is fragmentation?",
        "What is the difference between internal and external fragmentation?",
        "What is a system call?",
        "What is the difference between monolithic kernel and microkernel?"
         
    ]

    };

    let questions = [];
    let currentQuestionIndex = -1;
    let timer;

    const questionText = document.getElementById("question-text");
    const countdownElement = document.getElementById("countdown");
    const answerBox = document.getElementById("answer");
    const startBtn = document.getElementById("start-btn");
    const nextBtn = document.getElementById("next-btn");
    const saveBtn = document.getElementById("save-btn");
    const clearBtn = document.getElementById("clear-btn");
    const stopBtn = document.getElementById("stop-btn");
    const responseList = document.getElementById("response-list");
    const timeSelect = document.getElementById("time-select");
    const feedbackBox = document.getElementById("feedback-box");

    function startInterview() {
        const selectedDomain = domainSelect.value;
        questions = [...domainQuestions[selectedDomain]];
        currentQuestionIndex = 0;
        loadQuestion();
        nextBtn.disabled = false;
        saveBtn.disabled = false;
        stopBtn.disabled = false;
        startBtn.disabled = true;
    }

    function loadQuestion() {
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            questionText.textContent = currentQuestion;
    
            // ✅ Set progress indicator text
            const progressText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
            document.getElementById("progress-indicator").textContent = progressText;
    
            speakQuestion(currentQuestion);
            answerBox.value = "";
            let selectedTime = parseInt(timeSelect.value);
            startTimer(selectedTime);
        } else {
            completeInterview();
        }
    }
    

    function startTimer(seconds) {
        clearInterval(timer);
        let timeLeft = seconds;
        countdownElement.textContent = `${timeLeft}s`;
        updateTimerStyle(timeLeft);
        timer = setInterval(() => {
            timeLeft--;
            countdownElement.textContent = `${timeLeft}s`;
            updateTimerStyle(timeLeft);
            if (timeLeft <= 0) {
                clearInterval(timer);
                nextQuestion();
            }
        }, 1000);
    }

    function updateTimerStyle(timeLeft) {
        const timerCircle = document.getElementById("timer-circle");
    
        // Reset styles
        timerCircle.classList.remove("text-green-500", "text-yellow-500", "text-red-500");
    
        if (timeLeft > 10) {
            timerCircle.classList.add("text-green-500"); // Plenty of time
        } else if (timeLeft > 5) {
            timerCircle.classList.add("text-yellow-500"); // Warning
        } else {
            timerCircle.classList.add("text-red-500"); // Critical
        }
    }
    

    function speakQuestion(text) {
        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
        }
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.pitch = 1;
        utterance.rate = 1;
        speechSynthesis.speak(utterance);
    }

    function nextQuestion() {
        clearInterval(timer);
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            completeInterview();
        }
    }

    function completeInterview() {
        questionText.textContent = "Interview completed!";
        countdownElement.textContent = "--";
        nextBtn.disabled = true;
        saveBtn.disabled = true;
        stopBtn.disabled = true;
        startBtn.disabled = false;
    }

    function stopInterview() {
        clearInterval(timer);
        questionText.textContent = "Interview Stopped.";
        countdownElement.textContent = "--";
        nextBtn.disabled = true;
        saveBtn.disabled = true;
        stopBtn.disabled = true;
        startBtn.disabled = false;
        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
        }
    }

    function containsWord(word, text) {
        return new RegExp(`\\b${word}\\b`, 'i').test(text);
    }

    function saveAnswer() {
        const answerText = answerBox.value.trim();
        if (answerText) {
            const selectedDomain = domainSelect.value;
            let feedbackText = "";
    
            // Show feedback only if domain is "general"
            if (selectedDomain === "general") {
                feedbackText = generateFeedback(answerText, currentQuestionIndex);
                feedbackBox.innerHTML = `<strong>Feedback:</strong> ${feedbackText}`;
            } else {
                feedbackBox.innerHTML = ""; // Clear feedback box for other domains
            }
    
            const li = document.createElement("li");
            li.innerHTML = `<strong>Q:</strong> ${questions[currentQuestionIndex]}<br>
                            <strong>A:</strong> ${answerText}${
                                selectedDomain === "general"
                                    ? `<br><span class="feedback"><strong>Feedback:</strong> ${feedbackText}</span>`
                                    : ""
                            }`;
            responseList.appendChild(li);
            localStorage.setItem(`response_${currentQuestionIndex}`, answerText);
        }
    }
    

    function generateFeedback(answer, questionIndex) {
        const keywords = [
            ["experience", "background", "skills"],
            ["strength", "improve", "weakness"],
            ["career", "future", "goal"],
            ["challenge", "problem", "solution"],
            ["company", "mission", "value"],
            ["conflict", "resolve", "teamwork"],
            ["Python", "Java", "C++"],
            ["deadline", "pressure", "manage"],
            ["project", "contribution", "role"],
            ["disagree", "collaborate", "respect"]
        ];
        let feedback = "Try including keywords like: ";
        let found = false;
        const words = keywords[questionIndex] || [];
        words.forEach(word => {
            if (!containsWord(word, answer)) {
                feedback += word + ", ";
                found = true;
            }
        });
        return found ? feedback.slice(0, -2) : "Great answer! Well-structured and relevant.";
    }

    function clearAllResponses() {
        if (confirm("Are you sure you want to clear all responses?")) {
            localStorage.clear();
            responseList.innerHTML = "";
            feedbackBox.innerHTML = "";
        }
    }
    function loadSavedResponses() {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("response_")) {
                const index = key.split("_")[1];
                const savedAnswer = localStorage.getItem(key);
                const li = document.createElement("li");
                li.innerHTML = `<strong>Q:</strong> Saved Answer #${parseInt(index) + 1}<br><strong>A:</strong> ${savedAnswer}`;
                responseList.appendChild(li);
            }
        }
    }

    startBtn.addEventListener("click", startInterview);
    nextBtn.addEventListener("click", nextQuestion);
    saveBtn.addEventListener("click", saveAnswer);
    clearBtn.addEventListener("click", clearAllResponses);
    stopBtn.addEventListener("click", stopInterview);

    timeSelect.addEventListener("change", () => {
        if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
            startTimer(parseInt(timeSelect.value));
        }
    });

    const video = document.getElementById("video-preview");
    const filterSelect = document.getElementById("filter-select");
    //const customBgInput = document.getElementById("custom-bg");
    const videoContainer = document.getElementById("video-container");

    filterSelect.addEventListener("change", () => {
        video.style.filter = filterSelect.value;
    });

        loadSavedResponses();
});
