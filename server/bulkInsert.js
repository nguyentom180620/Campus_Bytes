import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

async function connectDB() {
  try {
    await mongoose.connect('mongodb+srv://nguyentom180620:BzNobEFz0LPSf29Q@campus-bytes-data.h59d3.mongodb.net/test?retryWrites=true&w=majority');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

async function generateUsers() {
  const usersToInsert = [];

  for (let i = 1; i <= 95; i++) {
    const username = `Account${i}`;
    const email = `user${i}@gmail.com`;
    const password = `user${i}`;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`Hashed password for ${username}: ${hashedPassword}`); // Debug log

    usersToInsert.push({ username, email, password: hashedPassword });
  }

  try {
    await User.insertMany(usersToInsert);
    console.log('Successfully inserted 95 users');
  } catch (err) {
    console.error('Error inserting users:', err);
  } finally {
    mongoose.connection.close();
  }
}

(async () => {
  await connectDB();
  await generateUsers();
})();
