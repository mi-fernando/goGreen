import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const file = "./data.json";
const git = simpleGit();

const makeCommits = async (n) => {
  if (n === 0) {
    console.log("✅ All commits created. Pushing to GitHub...");
    await git.push();
    return;
  }

  const x = random.int(0, 54);
  const y = random.int(0, 6);
  const date = moment()
    .subtract(1, "year")
    .add(1, "day")
    .add(x, "weeks")
    .add(y, "days")
    .format();

  const data = { date };

  await jsonfile.writeFile(file, data);
  await git.add([file]);
  await git.commit(date, { "--date": date });

  console.log(`✅ Commit #${101 - n} at ${date}`);

  makeCommits(n - 1);
};

makeCommits(100);
