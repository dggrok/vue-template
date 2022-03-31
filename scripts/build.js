const { execSync } = require("child_process");
const chalk = require("chalk");
const inquirer = require("inquirer");
const { packages } = require("./modules");
const scopeOfModule = require("./scopeOfModule");

const promptList = [
  {
    type: "checkbox",
    message: "请在下列模块中选择性执行 yarn build 命令",
    name: "module",
    choices: packages,
    pageSize: 8,
  },
];

function buildPKG(scopes) {
  try {
    console.log(chalk.green("Start build packages ..."));
    scopes.forEach((scope) => {
      let errMsg = "";
      execSync(`pnpm --filter ${scope} build`, (error) => {
        if (error) {
          errMsg = error;
          console.log(chalk.red(error));
        }
      });
      if (errMsg) {
        errMsg = "";
      } else {
        console.log(chalk.green(`[${scope}] build success`));
      }
    });
    console.log(chalk.green("Finish build packages"));
  } catch (error) {
    console.log(error);
  }
}

inquirer.prompt(promptList).then(({ module }) => {
  buildPKG(module.map((m) => scopeOfModule[m]));
});
