import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const target = path.join(root, 'packages', 'app-ui', 'src');
const scriptFile = /\.(js|mjs|cjs|ts|tsx|jsx)$/;

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) return walk(full);
    return scriptFile.test(name) ? [full] : [];
  });
}

function scriptComments(text, file) {
  const scanner = ts.createScanner(
    ts.ScriptTarget.Latest,
    false,
    file.endsWith('x') ? ts.LanguageVariant.JSX : ts.LanguageVariant.Standard,
    text
  );
  const lines = [];
  const braces = [];
  for (
    let kind = scanner.scan();
    kind !== ts.SyntaxKind.EndOfFileToken;
    kind = scanner.scan()
  ) {
    if (kind === ts.SyntaxKind.TemplateHead) {
      braces.push(0);
    } else if (kind === ts.SyntaxKind.OpenBraceToken && braces.length) {
      braces[braces.length - 1] += 1;
    } else if (kind === ts.SyntaxKind.CloseBraceToken && braces.length) {
      if (braces[braces.length - 1] === 0) {
        if (
          scanner.reScanTemplateToken(false) === ts.SyntaxKind.TemplateTail
        ) {
          braces.pop();
        }
      } else {
        braces[braces.length - 1] -= 1;
      }
    } else if (
      kind === ts.SyntaxKind.SingleLineCommentTrivia ||
      kind === ts.SyntaxKind.MultiLineCommentTrivia
    ) {
      lines.push(text.slice(0, scanner.getTokenStart()).split('\n').length);
    }
  }
  return lines;
}

const found = [];
for (const file of walk(target)) {
  for (const line of scriptComments(readFileSync(file, 'utf8'), file)) {
    found.push(`${path.relative(root, file)}:${line}`);
  }
}

if (found.length) {
  console.error(`주석 ${found.length}곳\n${found.join('\n')}`);
  process.exit(1);
}
