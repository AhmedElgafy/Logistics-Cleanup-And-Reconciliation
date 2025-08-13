import dotenv from "dotenv";
dotenv.config();
const FilePath:string=process.env.BASE_TEST_FILE||"";
export default FilePath