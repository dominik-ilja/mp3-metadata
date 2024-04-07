const fs = require("node:fs");
const path = require("node:path");
const process = require("node:process");
const ffmpeg = require("fluent-ffmpeg");

const SRC_PATH = path.join(__dirname, "./mp3");
const OUTPUT_PATH = path.join(__dirname, "/output");
const FILE_EXTENSION = ".mp3";

// get all the file names from the mp3 folder
// have an array of the correct names
const songs = fs.readdirSync(path.join(__dirname, SRC_PATH));
const song_titles = [
  "Gnomeball",
  "Gnome King",
  "Gnome Village",
  "Gnome Village 2",
  "Goblin Village",
  "Greatness",
  "High Seas",
  "Horizon",
  "Iban",
  "In the Manor",
  "Inspiration",
  "Intrepid",
  "Jolly R",
  "Jungle Island",
  "Jungly 1",
  "Jungly 2",
  "Jungly 3",
  "Knightly",
  "Legion",
  "Lightness",
  "Lightwalk",
  "Long Ago",
  "Long Way Home",
  "Lullaby",
  "Mage Arena",
  "Magic Dance",
  "Magical Journey",
  "March",
  "Medieval",
  "Mellow",
  "Miles Away",
  "Monarch Waltz",
  "Moody",
  "Neverland",
  "Nightfall",
  "Oriental",
  "Overture",
  "Parade",
  "Quest",
  "Regal",
  "Reggae",
  "Reggae2",
  "Riverside",
  "Royale",
  "Rune Essence",
  "Sad Meadow",
  "Scape Cave",
  "Scape Sad",
  "Scape Original",
  "Scape Wild",
  "Sea Shanty",
  "Sea Shanty 2",
  "Serenade",
  "Serene",
  "Shine",
  "Soundscape",
  "Splendour",
  "Spooky",
  "Spooky Jungle",
  "Starlight",
  "The Desert",
  "The Shadow",
  "The Tower",
  "Trawler",
  "Trawler Minor",
  "Tree Spirits",
  "Tribal",
  "Tribal 2",
  "Tribal Background",
  "Trinity",
  "Troubled",
  "Underground",
  "Underground Pass",
  "Upcoming",
  "Venture",
  "Voodoo Cult",
  "Voyage",
  "Witching",
  "Wilderness",
  "Wilderness 2",
  "Wilderness 3",
  "Wonderous",
];

if (songs.length !== song_titles.length) {
  console.error(
    `The amount of songs (${songs.length}) in ${SRC_PATH} doesn't match the amount of song title provided (${song_titles.length})`
  );
  process.exit(1);
}

if (!fs.existsSync(OUTPUT_PATH)) {
  try {
    fs.mkdirSync(OUTPUT_PATH);
  } catch (error) {
    console.log(`Error occurred creating output directory: ${error}`);
    console.log("Stopping execution");
    process.exit(1);
  }
}

function createMetadata(title, track) {
  const options = [];
  const metadata_flag = "-metadata";
  const metadata = { artist: "Old School Runescape", album: "OSRS OST", title, track };

  for (let key in metadata) {
    options.push(metadata_flag);
    options.push(`${key}=${metadata[key]}`);
  }

  return options;
}

for (let i = 0; i < songs.length; ++i) {
  const song = songs[i];
  const title = song_titles[i];
  const track = song.substring(0, song.indexOf(" "));

  ffmpeg(path.join(SRC_PATH, `/${song}`))
    .audioCodec("copy")
    .outputOptions(...createMetadata(title, track))
    .output(path.join(OUTPUT_PATH, `/${title}${FILE_EXTENSION}`))
    .on("end", () => console.log(`${title} has complete (${i}/${songs.length})`))
    .run();
}

console.log("File end");
