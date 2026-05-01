function initSpeech(){
    if(!window.speechSynthesis){
        console.warn("Text-to-speech not supported");
        return;
    };

    const buttons = document.querySelectorAll(".speak-btn");
    let voices = [];

    function loadVoices(){
        voices = speechSynthesis.getVoices();
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
    
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            let text = btn.dataset.text || "";
            const lang = btn.dataset.lang || "en";

            text = text.replace(/\//g, " or ").replace(/₪/g, "").trim();

            const utterance = new SpeechSynthesisUtterance(text);
            if(!voices.length){
                voices = speechSynthesis.getVoices();
            };

            let voice = voices.find(v =>
                v.lang.toLowerCase().includes(lang === "he" ? "he" : "en")
            );

            if(voice){
                utterance.voice = voice;
                utterance.lang = voice.lang;
            } else {
                voice = voices[0];
            };

            speechSynthesis.cancel();
            speechSynthesis.resume();
            speechSynthesis.speak(utterance);
        });
    });
};
document.addEventListener("DOMContentLoaded", initSpeech);