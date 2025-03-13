const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DB_URL",
  projectId: "YOUR_PROJECT_ID",
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const sanitizeInput = (input) => {
  return input.substring(0, 15).replace(/[^a-zA-Z0-9_-]/g, '');
};

const validateScore = (time, errors) => {
  return time > 10 && errors < time/2;
};

const addScoreToLeaderboard = (time, errors) => {
  if(!validateScore(time, errors)) return;
  
  const playerName = sanitizeInput(prompt("Enter your hacker name:") || 'Anonymous');
  
  database.ref('scores').push({
    name: playerName,
    time: time.toFixed(2),
    errors,
    timestamp: Date.now()
  });
};

const fetchLeaderboard = () => {
  database.ref('scores').orderByChild('time').limitToLast(10).on('value', snapshot => {
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = '';
    
    snapshot.forEach(child => {
      const { name, time, errors } = child.val();
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="rank">${name}</span>
        <span class="time">${time}s</span>
        <span class="errors">${errors} errors</span>
      `;
      leaderboardList.appendChild(li);
    });
  });
};

// Initial fetch
fetchLeaderboard();
