import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    mongoose.connect('mongodb://admin:admin123@localhost:27017/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Could not connect to MongoDB', err);
    // Thoát process nếu kết nối thất bại
    process.exit(1);
  }
};

export default connectDB;