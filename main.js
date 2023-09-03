import express from "express";
import expressLayouts from "express-layouts";
import { readFile } from "fs/promises";
import morgan from "morgan";

const app = express();
const port = 8000;

//third party middleware
app.use(expressLayouts);
app.use(morgan("dev"));

//built-in middleware
app.use(express.static("public"));

//application middleware
app.use((req, res, next) => {
  console.log("Time : ", Date.now());
  next();
});
app.set("view engine", "ejs");
app.set("layout", "my-default-layout");

const loadData = async () => {
  const mhs = await readFile("./data/mhs.json", { encoding: "utf-8" });

  return JSON.parse(mhs);
};

const toDetailData = (NIM) => {
  app.link(`/${NIM}`);
};

app.get("/", async (req, res) => {
  const data = await loadData();
  res.render("index", {
    title: "Halaman Utama",
    layout: "layout/main-layout",
    data,
  });
});

app.get("/about", (req, res, next) => {
  res.render("about", {
    title: "Halaman About",
    layout: "layout/main-layout",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Halaman Contact",
    layout: "layout/main-layout",
  });
});

app.get("/:NIM", async (req, res) => {
  const data = await loadData();
  res.render("detail", {
    title: "Halaman detail",
    layout: "layout/main-layout",
    single_data: req.params.NIM,
    data,
  });
});

app.use("/", (req, res) => {
  res.status(404).render("not-found", {
    title: "Halaman tidak ditemukan",
    layout: "layout/main-layout",
  });
});

app.listen(port, async () => {
  console.log(`Server is listen in port ${port}`);
});
