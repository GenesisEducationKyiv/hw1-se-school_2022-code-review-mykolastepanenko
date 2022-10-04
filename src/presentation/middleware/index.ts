import multer from "multer";

export default function middleware(app: any, express: any) {
  const upload = multer();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(upload.none());
}
