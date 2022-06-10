const core = require("@actions/core");
const github = require("@actions/github");
const crypto = require("crypto");

(async () => {
    const token = core.getInput("token");
    const octokit = github.getOctokit(token);

    const hash = crypto.createHash("sha1");
    hash.update(`${github.context.issue.number}`);

    await octokit.rest.issues.createComment({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        issue_number: github.context.issue.number,
        body: `The link ID is \`${hash.digest("hex").substring(0, 6)}\``
    });
})();
