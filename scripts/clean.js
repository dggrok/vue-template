const { execSync } = require("child_process");
const chalk = require("chalk");
const inquirer = require("inquirer");
const { docs, packages, projects } = require("./modules");
const scopeOfModule = require("./scopeOfModule");

const promptList = [
  {
    type: "checkbox",
    message: "请在下列模块中选择性执行 clean 命令",
    name: "module",
    choices: [
      ...docs,
      ...packages,
      ...projects,
    ],
    pageSize: 8,
  },
];

async function huskyInit(scopes) {
  try {
    console.log(chalk.green("Start clean ..."));
    scopes.forEach((scope) => {
      let errMsg = "";
      execSync(`lerna exec --scope=${scope} -- yarn clean`, (error) => {
        if (error) {
          errMsg = error;
          console.log(chalk.red(error));
        }
      });
      if (errMsg) {
        errMsg = "";
      } else {
        console.log(chalk.green(`[${scope}] clean success`));
      }
    });
    console.log(chalk.green("Finish clean"));
  } catch (error) {
    console.log(error);
  }
}

inquirer.prompt(promptList).then(({ module }) => {
  huskyInit(module.map((m) => scopeOfModule[m]));
});
