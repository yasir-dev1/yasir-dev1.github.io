// Simple typewriter effect cycling through the existing <ul class="dynamic-txts"> words
(function(){
    const lis = Array.from(document.querySelectorAll('.dynamic-txts li'));
    if(!lis.length) return;

    // Extract words from spans, then clear them for typing
    const spans = lis.map(li => li.querySelector('span'));
    const words = spans.map(s => s.textContent.trim());
    spans.forEach(s => s.textContent = '');
    lis.forEach((li, i) => li.style.display = i === 0 ? 'block' : 'none');

    const typingSpeed = 80; // ms per character
    const deletingSpeed = 40; // ms per character when deleting
    const pauseAfterTyping = 1400; // ms to wait after word completed

    let index = 0;

    function wait(ms){ return new Promise(res => setTimeout(res, ms)); }

    async function run(){
        while(true){
            const span = spans[index];
            const word = words[index];

            // ensure only the active li is visible
            lis.forEach((li,i) => li.style.display = i === index ? 'block' : 'none');

            // type
            for(let i=1;i<=word.length;i++){
                span.textContent = word.slice(0,i);
                await wait(typingSpeed);
            }

            await wait(pauseAfterTyping);

            // delete
            for(let i=word.length;i>=0;i--){
                span.textContent = word.slice(0,i);
                await wait(deletingSpeed);
            }

            index = (index + 1) % words.length;
        }
    }

    // start
    run();
})();