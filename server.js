const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "Lovense controller backend is running!"
  });
});

app.post("/auth-token", async (req, res) => {
  try {
    const { uid } = req.body;

    if (!uid) {
      return res.status(400).json({
        error: "Missing uid"
      });
    }

    const response = await fetch(
      "https://api.lovense-api.com/api/basicApi/getToken",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          uid: uid,
          token: process.env.LOVENSE_KEY
        })
      }
    );

    const data = await response.json();

    res.json(data);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to get Lovense auth token"
    });

  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
