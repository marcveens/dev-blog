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

  const response = fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${file}`, {
    headers: {
      Accept: 'application/vnd.github.raw',
      Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });

  const data = await (await response).text();

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
      <pre className="mb-0 mt-4">
        <code className={language ? `language-${language}` : ''} data-ln-start-from={startLine}>
          {fileContent}
        </code>
      </pre>
      <footer className="xm:py-6 border-code-embed-footer -mx-4 flex justify-between border-t bg-code-background px-4 py-2 text-sm text-code-color sm:-mx-6">
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
