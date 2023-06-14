const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/practiceData", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "min length 5 is required"],
    trim: true,
  },
  ctype: {
    type: String,
    enum: ["Back End", "Front End", "Database"],
  },
  videos: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error("Videos count should not be negative");
      }
    },
    // validate: {
    //   validator: function (value) {
    //     return value.length < 0;
    //   },
    //   message: "Videos count should not be negative",
    // },
  },
  author: String,
  active: Boolean,
  date: {
    type: Date,
    default: Date.Now,
  },
});

const Playlist = new mongoose.model("playlist", playlistSchema);

// Create Documents

const createDocument = async () => {
  try {
    // const jsPlaylist = new Playlist({
    //   name: "javascript",
    //   ctype: "front End",
    //   videos: 150,
    //   author: "Miten",
    //   active: true,
    // });

    // const mongoPlaylist = new Playlist({
    //   name: "MongoDB",
    //   ctype: "Database",
    //   videos: 10,
    //   author: "Miten",
    //   active: true,
    // });

    // const mongoosePlaylist = new Playlist({
    //   name: "Mongoose js",
    //   ctype: "Database",
    //   videos: 4,
    //   author: "Miten",
    //   active: true,
    // });

    const expressPlaylist = new Playlist({
      name: "Express.js 123",
      ctype: "Back End",
      videos: 5,
      author: "Miten",
      active: true,
    });

    const result = await Playlist.insertMany([expressPlaylist]);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

// createDocument();

// Read Documents

const getDocument = async () => {
  try {
    const result = await Playlist.find({
      author: "Miten",
    })
      .select({
        name: 1,
      })
      .sort({ name: 1 });
    //   .countDocuments();
    //   .limit(2);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

// getDocument();

// Update the Documents

const updateDocument = async (_id) => {
  try {
    const result = await Playlist.findByIdAndUpdate(
      { _id },
      {
        $set: {
          name: "Javascript",
        },
      },
      {
        new: true,
      }
    );
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

// updateDocument("64896411327fac8f87298c9e");

//Delete the Documents

const deleteDocument = async (_id) => {
  try {
    const result = await Playlist.findByIdAndDelete({ _id });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

// deleteDocument("64898fb844537d1332d5cbad");
