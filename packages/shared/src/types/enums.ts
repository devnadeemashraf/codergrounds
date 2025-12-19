export enum FileType {
  JavaScript = 'javascript',
  TypeScript = 'typescript',
  Python = 'python',
  CSS = 'css',
  HTML = 'html',
  JSON = 'json',
  Markdown = 'markdown',
  PlainText = 'plaintext',
}

export enum PlaygroundVisibility {
  Public = 'public',
  Private = 'private',
  Unlisted = 'unlisted', // Access only via link
}

export enum PlaygroundRole {
  Owner = 'owner',
  Editor = 'editor',
  Viewer = 'viewer',
}

export enum ExecutionStatus {
  Queued = 'queued',
  Running = 'running',
  Completed = 'completed',
  Failed = 'failed',
  Timeout = 'timeout',
}

export enum CodeLanguage {
  JavaScript = 'javascript',
  TypeScript = 'typescript',
  Python = 'python',
  HTML = 'html',
  CSS = 'css',
}

export enum MessageType {
  Text = 'text',
  System = 'system',
  CodeSnippet = 'code_snippet',
}

export enum UserProvider {
  Email = 'email',
  Google = 'google',
  GitHub = 'github',
}
