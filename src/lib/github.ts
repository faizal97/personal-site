export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
  topics: string[];
}

export async function fetchGitHubRepos(
  username = 'faizal97',
): Promise<GitHubRepo[]> {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=stargazers_count&direction=desc`,
    { headers: { Accept: 'application/vnd.github.v3+json' } },
  );

  if (!response.ok) {
    console.error(`GitHub API error: ${response.status}`);
    return [];
  }

  const repos: GitHubRepo[] = await response.json();

  return repos
    .filter((repo) => !repo.fork && !repo.name.endsWith('.github.io'))
    .slice(0, 9);
}
