const { execSync } = require("child_process");
const chalk = require("chalk");
const { packages } = require("./modules");
const scopeOfModule = require("./scopeOfModule");

const moduless = [
  [packages[0]],
];

function buildPKG() {
  try {
    let finishStep = 0;
    moduless.forEach(async (modules) => {
      if (finishStep === 0) {
        console.log(chalk.green("Start build ..."));
      }
      execSync(
        `lerna exec ${modules
          .map((module) => `--scope=${scopeOfModule[module]}`)
          .join(" ")} -- yarn build`,
        (error) => {
          if (error) {
            console.log(chalk.red(error));
          }
        }
      );
      finishStep += 1;
      if (finishStep === moduless.length) {
        console.log(chalk.green("Fininsh build"));
      }
    });
  } catch (error) {
    console.log(error);
  }
}

buildPKG();
