import multer from "multer";

export default function middleware(app, express) {
  const upload = multer();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(upload.none());
}
