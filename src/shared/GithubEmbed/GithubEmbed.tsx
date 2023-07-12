import { Octokit } from '@octokit/core';
import * as styles from './GithubEmbed.css';

type GithubEmbedProps = {
  owner: string;
  repo: string;
  file: string;
  startLine?: number;
  endLine?: number;
};

export const GithubEmbed = (props: GithubEmbedProps) => {
  return <GithubEmbedInternal {...props} />;
};

export const GithubEmbedInternal = async (props: GithubEmbedProps) => {
  const { owner, repo, file, startLine, endLine } = props;

  const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });
  const { data } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner,
    repo,
    path: file,
    mediaType: {
      format: 'raw'
    }
  });

  const url = `https://github.com/${owner}/${repo}/blob/main/${file}`;
  let urlWithLineNumbers: string | undefined = undefined;
  const fileName = file.split('/').pop();
  const extension = fileName?.split('.').pop();
  const language = getLanguageByExtension(extension);

  let fileContent = data.toString();

  if (startLine && endLine) {
    fileContent = extractLines(fileContent, startLine, endLine);
    urlWithLineNumbers = `${url}#L${startLine}-L${endLine}`;
  }

  const spacesToRemove = countSpacesUntilFirstChar(fileContent);
  fileContent = removeLeadingSpaces(fileContent, spacesToRemove);

  return (
    <>
      <pre className={styles.codePre}>
        <code className={language ? `language-${language}` : ''} data-ln-start-from={startLine}>
          {fileContent}
        </code>
      </pre>
      <footer className={styles.footer}>
        <div>
          <a href={urlWithLineNumbers || url} target="_blank" rel="noopener noreferrer">
            {fileName}
          </a>{' '}
          on GitHub
        </div>

        <div>
          View{' '}
          <a href={url} target="_blank" rel="noopener noreferrer">
            Raw
          </a>
        </div>
      </footer>
    </>
  );
};

const extractLines = (text: string, startLine: number, endLine: number) => {
  const lines = text.split('\n');
  const extractedLines = lines.slice(startLine - 1, endLine).join('\n');
  return extractedLines;
};

const countSpacesUntilFirstChar = (str: string) => {
  let count = 0;

  while (str[count] === ' ') {
    count++;
  }

  return count;
};

const removeLeadingSpaces = (text: string, spaceCount: number) => {
  const regex = new RegExp(`^ {0,${spaceCount}}`, 'gm');
  const result = text.replace(regex, '');
  return result;
};

const getLanguageByExtension = (extension: string | undefined) => {
  switch (extension) {
    case 'ts':
      return 'typescript';
    case 'tsx':
      return 'tsx';
    case 'js':
      return 'javascript';
    case 'jsx':
      return 'jsx';
    case 'css':
      return 'css';
    case 'html':
      return 'html';
    case '.yml':
      return 'yaml';
  }
};
