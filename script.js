document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const result = document.querySelector('#result');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const answers = new FormData(form);
        let score = 0;

        // Validate answers
        answers.forEach((value, key) => {
            const correctAnswer = form.querySelector(`[data-answer="${key}"]`).dataset.correct;
            if (value === correctAnswer) {
                score++;
            }
        });

        // Provide feedback
        result.textContent = `You scored ${score} out of ${answers.size}`;
    });
});
