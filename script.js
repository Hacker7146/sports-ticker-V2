document.addEventListener('DOMContentLoaded', () => {
    const scoresContainer = document.getElementById('scores');
    const sportsApiUrls = {
        NFL: 'http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard',
        NBA: 'http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard',
        MLB: 'http://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard',
        UFL: 'https://www.espn.com/ufl/scoreboard'
    };
    let activeSport = 'NFL';

    function fetchScores() {
        fetch(sportsApiUrls[activeSport])
            .then(response => response.json())
            .then(data => {
                scoresContainer.innerHTML = '';
                const events = data.events || [];
                events.forEach(event => {
                    const scoreCard = document.createElement('div');
                    scoreCard.className = 'score-card';
                    scoreCard.innerHTML = `
                        <h2>${event.name}</h2>
                        <p>${event.competitions[0].competitors[0].team.displayName} vs ${event.competitions[0].competitors[1].team.displayName}</p>
                        <p>${event.competitions[0].competitors[0].score} - ${event.competitions[0].competitors[1].score}</p>
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
    setInterval(fetchScores, 120000); // Update every 2 minutes
});
