const mongoose = require('mongoose');

console.log('Attempting to connect to MongoDB...');

mongoose.connect('mongodb://localhost:27017/greenworm', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Successfully connected to MongoDB!');
  console.log('Creating test collection...');
  
  // Create a test model
  const Test = mongoose.model('Test', new mongoose.Schema({ name: String }));
  
  // Insert a test document
  return Test.create({ name: 'Test Connection' });
})
.then(() => {
  console.log('Test document created successfully!');
  mongoose.connection.close();
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
  mongoose.connection.close();
});
