document.addEventListener('DOMContentLoaded', () => {
    const scoresContainer = document.getElementById('scores');
    const sports = ['MLB', 'NFL', 'NBA', 'UFL'];
    const apiUrl = 'https://api.example.com/scores'; // Replace with actual API URL

    function fetchScores() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                scoresContainer.innerHTML = '';
                sports.forEach(sport => {
                    const sportScores = data[sport];
                    sportScores.forEach(game => {
                        const scoreCard = document.createElement('div');
                        scoreCard.className = 'score-card';
                        scoreCard.innerHTML = `
                            <h2>${sport}</h2>
                            <p>${game.team1} vs ${game.team2}</p>
                            <p>${game.score1} - ${game.score2}</p>
                        `;
                        scoresContainer.appendChild(scoreCard);
                    });
                });
            })
            .catch(error => console.error('Error fetching scores:', error));
    }

    fetchScores();
    setInterval(fetchScores, 120000); // Update every 2 minutes
});