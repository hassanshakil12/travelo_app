import { connectDB } from "../config";

const bootstrap = async (): Promise<void> => {
  await connectDB();
};

export default bootstrap;
