document.querySelectorAll('[data-copy]').forEach(button => {
  button.addEventListener('click', async () => {
    const target = document.getElementById(button.dataset.copy);
    if (!target) return;
    const text = target.innerText;
    try {
      await navigator.clipboard.writeText(text);
      const old = button.innerHTML;
      button.innerHTML = '<i class="bi bi-check2"></i> Copied';
      setTimeout(() => button.innerHTML = old, 1500);
    } catch (error) {
      const range = document.createRange();
      range.selectNodeContents(target);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      button.innerHTML = '<i class="bi bi-info-circle"></i> Select and copy';
    }
  });
});

const quizForm = document.getElementById('quizForm');
if (quizForm) {
  quizForm.addEventListener('submit', event => {
    event.preventDefault();
    let score = 0;
    const questions = [...document.querySelectorAll('.quiz-question')];
    questions.forEach(question => {
      const answer = question.dataset.answer;
      const selected = question.querySelector('input:checked');
      const feedback = question.querySelector('.feedback');
      question.classList.remove('correct', 'incorrect');
      if (selected && selected.value === answer) {
        score++;
        question.classList.add('correct');
        feedback.textContent = 'Correct.';
      } else {
        question.classList.add('incorrect');
        feedback.textContent = selected ? 'Not quite. Review this section and try again.' : 'Choose an answer, then try again.';
      }
    });
    const result = document.getElementById('quizResult');
    result.textContent = `Your score: ${score} out of ${questions.length}. ${score === questions.length ? 'Excellent work!' : 'Review the explanations and try again.'}`;
  });
  quizForm.addEventListener('reset', () => {
    setTimeout(() => {
      document.querySelectorAll('.quiz-question').forEach(q => {
        q.classList.remove('correct', 'incorrect');
        q.querySelector('.feedback').textContent = '';
      });
      document.getElementById('quizResult').textContent = '';
    }, 0);
  });
}

const topButton = document.getElementById('topButton');
window.addEventListener('scroll', () => {
  if (topButton) topButton.style.display = window.scrollY > 500 ? 'grid' : 'none';
});
if (topButton) topButton.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));

document.querySelectorAll('.checklist input[type="checkbox"]').forEach((checkbox, index) => {
  const key = `mevi-devops-check-${index}`;
  try {
    checkbox.checked = localStorage.getItem(key) === 'true';
    checkbox.addEventListener('change', () => localStorage.setItem(key, checkbox.checked));
  } catch (error) {
    // Checklist still works without persistent browser storage.
  }
});
