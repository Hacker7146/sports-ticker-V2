document.addEventListener('DOMContentLoaded', () => {
    const scoresContainer = document.getElementById('scores');
    const sportsApiUrls = {
        NFL: 'https://fantasysports.yahooapis.com/fantasy/v2/league/NFL.l.XXXXXX/scoreboard',
        NBA: 'https://fantasysports.yahooapis.com/fantasy/v2/league/NBA.l.XXXXXX/scoreboard',
        MLB: 'https://fantasysports.yahooapis.com/fantasy/v2/league/MLB.l.XXXXXX/scoreboard',
        UFL: 'https://fantasysports.yahooapis.com/fantasy/v2/league/UFL.l.XXXXXX/scoreboard'
    };
    const clientId = 'dj0yJmk9dlZJWDR0ZnlDMHU5JmQ9WVdrOVowZHJUbGx4TkhNbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTYw';
    const clientSecret = '8e75997a96e2ecd9ac13bf1cdb7eead89cdc2f23';
    let activeSport = 'MLB';

    function fetchScores() {
        const url = sportsApiUrls[activeSport];

        if (activeSport === 'UFL') {
            scoresContainer.innerHTML = '<p>Scores for UFL are not available at this time.</p>';
            return;
        }

        fetch(url, {
            headers: {
                'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                scoresContainer.innerHTML = '';
                const events = data.fantasy_content.league[1].scoreboard[0].matchups || [];
                events.forEach(event => {
                    const homeTeam = event.home_team;
                    const awayTeam = event.away_team;
                    const scoreCard = document.createElement('div');
                    scoreCard.className = 'score-card';
                    scoreCard.innerHTML = `
                        <h2>${homeTeam.name} vs ${awayTeam.name}</h2>
                        <p>${homeTeam.points} - ${awayTeam.points}</p>
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
    setInterval(fetchScores, 5000); // Update every 5 seconds
});
