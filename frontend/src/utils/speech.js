function initSpeech() {
    if (!window.speechSynthesis) {
        console.warn("Text-to-speech not supported");
        return;
    };

    const buttons = document.querySelectorAll(".speak-btn");
    let voices = [];

    function loadVoices() {
        voices = speechSynthesis.getVoices();
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            let rawText = btn.dataset.text || "";
            const lang = btn.dataset.lang || "en";

            const text = cleanText(rawText, lang);

            const utterance = new SpeechSynthesisUtterance(text);
            if (!voices.length) {
                voices = speechSynthesis.getVoices();
            };

            let voice = voices.find(v =>
                v.lang.toLowerCase().includes(lang === "he" ? "he" : "en")
            );

            if (voice) {
                utterance.voice = voice;
            };
            utterance.lang = lang === "he" ? "he-IL" : "en-US";

            speechSynthesis.cancel();
            speechSynthesis.resume();
            speechSynthesis.speak(utterance);
        });
    });
};
document.addEventListener("DOMContentLoaded", initSpeech);

function cleanText(text, lang) {
    return text
        .replace(/&[#A-Za-z0-9]+;/g, "")
        .replace(/['"׳״]/g, "")
        .replace(/[\u200B-\u200D\uFEFF]/g, "")
        .replace(/\//g, lang === "he" ? " או " : " or ")
        .replace(/₪/g, "")
        .replace(/\s+/g, " ")
        .trim();
}