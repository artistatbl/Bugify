const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Jd1tubehd',
  database: 'issue-tracker'
});

// Insert dummy data
connection.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  
  console.log('Connected to database');
  
  const users = [
    ['user1', 'user1@example.com'],
    ['user2', 'user2@example.com'],
    ['user3', 'user3@example.com']
  ];

  const issues = [
    ['Bug 1', 'Description of Bug 1', 'OPEN', 'LOW', new Date(), 1],
    ['Bug 2', 'Description of Bug 2', 'IN_PROGRESS', 'MEDIUM', new Date(), 2],
    ['Bug 3', 'Description of Bug 3', 'CLOSED', 'HIGH', new Date(), 3]
  ];

  // Insert dummy users
  connection.query('INSERT INTO User (username, email) VALUES ?', [users], (err, result) => {
    if (err) {
      console.error('Error inserting users:', err);
    } else {
      console.log('Inserted users successfully');
      
      // Insert dummy issues
      connection.query('INSERT INTO Issue (title, description, status, priority, createdAt, assignedToId) VALUES ?', [issues], (err, result) => {
        if (err) {
          console.error('Error inserting issues:', err);
        } else {
          console.log('Inserted issues successfully');
        }
        connection.end();
      });
    }
  });
});
