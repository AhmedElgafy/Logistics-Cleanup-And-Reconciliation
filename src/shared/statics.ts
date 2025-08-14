import dotenv from "dotenv";
dotenv.config({ debug: false });
const FilePath: string = process.env.BASE_TEST_FILE || "";
export const DirName = "result";

export default FilePath;
