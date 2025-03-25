import { writeFileSync } from 'fs';

const users = [];
for (let i = 0; i < 1_000_000; i++) {
  users.push({
    id: i,
    name: `Пользователь ${i}`,
    company: "",
    department: "",
    jobTitle: ""
  });
}

writeFileSync('users-large.json', JSON.stringify(users));
