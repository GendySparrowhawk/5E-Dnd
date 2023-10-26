
// done in one a tuinary expression on a click listner to toggle hidden comments
const toggleButtons = document.querySelectorAll('.toggle-comments-btn');
toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
        const commentsContainer = button.nextElementSibling;
        commentsContainer.style.display = commentsContainer.style.display === 'none' || commentsContainer.style.display === '' ? 'block' : 'none';
    });
});
