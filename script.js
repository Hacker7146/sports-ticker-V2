document.addEventListener('DOMContentLoaded', () => {
    const scoresContainer = document.getElementById('scores');
    const sports = ['MLB', 'NFL', 'NBA', 'UFL'];
    const apiUrl = 'https://api.example.com/scores'; // Replace with actual API URL

    let activeSport = 'MLB';

    function fetchScores() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                scoresContainer.innerHTML = '';
                const sportScores = data[activeSport];
                sportScores.forEach(game => {
                    const scoreCard = document.createElement('div');
                    scoreCard.className = 'score-card';
                    scoreCard.innerHTML = `
                        <h2>${activeSport}</h2>
                        <p>${game.team1} vs ${game.team2}</p>
                        <p>${game.score1} - ${game.score2}</p>
                    `;
                    scoresContainer.appendChild(scoreCard);
                });
            })
            .catch(error => console.error('Error fetching scores:', error));
    }

    function updateActiveTab() {
        document.querySelectorAll('.tab-button').forEach(button => {
            button.classList.remove('active');
        });
        document.querySelector(`.tab-button[data-sport="${activeSport}"]`).classList.add('active');
    }

    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            activeSport = button.getAttribute('data-sport');
            updateActiveTab();
            fetchScores();
        });
    });

    updateActiveTab();
    fetchScores();
    setInterval(fetchScores, 5000); // Update every 2 minutes
});
