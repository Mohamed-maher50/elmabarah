var pdf = require("pdf-creator-node");
var fs = require("fs");
var options = {
  format: "A3",
  orientation: "portrait",
  border: "10mm",
  header: {
    height: "45mm",
    contents: '<div style="text-align: center;">Author: Shyam Hajare</div>',
  },
  footer: {
    height: "28mm",
    contents: {
      first: "Cover page",
      2: "Second page", // Any page number is working. 1-based index
      default:
        '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
      last: "Last Page",
    },
  },
};
var users = [
  {
    name: "Shyam",
    age: "26",
    phone: 01062616043,
  },
  {
    name: "Navjot",
    age: "26",
  },
  {
    name: "Vitthal",
    age: "26",
  },
];
router.get("/pdf", (req, res) => {
  var html = fs.readFileSync("pdf.html", "utf8");
  var document = {
    html: html,
    data: {
      ImgUrl:
        "https://api.elmabarah.com/public/storage/4223/media-library0APtVa",
      users: users,
      invoice: [
        {
          result: "success",
          reate: 3,
        },
        {
          result: "none",
          reate: 4,
        },
      ],
    },

    path: "./output.pdf",
    type: "",
  };
  try {
    pdf
      .create(document, options)
      .then((doc) => {
        res.download("./output.pdf");
        console.log(doc);
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (err) {
    console.log(err);
  }
});
