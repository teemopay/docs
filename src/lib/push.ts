import { Octokit } from "@octokit/rest";

export async function createCommit(content: string, path: string, message: string) {
  const octokit = new Octokit({ auth: process.env.ITHUB_TOKEN });

  // 新分支名称，格式为：update-年月日时分秒
  const batchName = `update-${new Date().toISOString().replace(/[-:]/g, '').slice(0, 12)}`;

  try {
    // 获取默认分支
    // const { data: repo } = await octokit.repos.get({
    //   owner: process.env.GITHUB_OWNER,
    //   repo: process.env.GITHUB_REPO,
    // });
    // const defaultBranch = repo.default_branch;
    const defaultBranch = process.env.GITHUB_BRANCH as string;

    // 获取默认分支的最新 commit
    const { data: refData } = await octokit.git.getRef({
      owner: process.env.GITHUB_OWNER as string,
      repo: process.env.GITHUB_REPO as string,
      ref: `heads/${defaultBranch}`,
    });

    // 创建新分支
    try {
      await octokit.git.createRef({
        owner: process.env.GITHUB_OWNER as string,
        repo: process.env.GITHUB_REPO as string,
        ref: `refs/heads/${batchName}`,
        sha: refData.object.sha,
      });
    } catch (error: any) {
      // 如果分支已存在，忽略错误
      if (error.status !== 422) throw error;
    }

    // 获取当前文件内容
    const { data: fileData } = await octokit.repos.getContent({
      owner: process.env.GITHUB_OWNER as string,
      repo: process.env.GITHUB_REPO as string,
      path: path,
      ref: batchName,
    });

    // 创建新的提交
    await octokit.repos.createOrUpdateFileContents({
      owner: process.env.GITHUB_OWNER as string,
      repo: process.env.GITHUB_REPO as string,
      path: path,
      message: message,
      content: Buffer.from(content).toString('base64'),
      sha: Array.isArray(fileData) ? fileData[0]?.sha : fileData.sha,
      branch: batchName,
    });

    // 创建 Pull Request
    await octokit.pulls.create({
      owner: process.env.GITHUB_OWNER as string,
      repo: process.env.GITHUB_REPO as string,
      title: `内容更新：${path}`,
      head: batchName,
      base: defaultBranch,
      body: message,
    });

  } catch (error) {
    console.error('Error in createCommit:', error);
    throw error;
  }
}