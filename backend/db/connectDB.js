import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		console.log("mongo_url: ", process.env.MONGO_URL);
		const conn = await mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.log("Error connecting to MongoDB: ", error.message);
		process.exit(1); // Exit with failure
	}
};
