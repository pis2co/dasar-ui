import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const root = path.resolve('projects/documentation');
function files(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const name = path.join(dir, entry.name);
    return entry.isDirectory() ? files(name) : [name];
  });
}

test('documentation source has no loader attributes or imports outside the project', () => {
  const errors = [];
  for (const file of files(path.join(root, 'src'))) {
    const text = readFileSync(file, 'utf8');
    if (!/\.[cm]?[jt]sx?$/.test(file)) {
      if (/\bwith\s*\{\s*loader\s*:/.test(text)) errors.push(`${file}: loader import`);
      for (const match of text.matchAll(/@import\s+(?:url\()?\s*['"]([^'"]+)['"]/g)) checkPath(match[1]);
      continue;
    }
    const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
    function visit(node) {
      if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
        if (node.attributes?.elements.some(element => element.name.text === 'loader')) errors.push(`${file}: loader import`);
        check(node.moduleSpecifier);
      } else if (ts.isCallExpression(node) && (node.expression.kind === ts.SyntaxKind.ImportKeyword || node.expression.getText(source) === 'require')) {
        check(node.arguments[0]);
      }
      ts.forEachChild(node, visit);
    }
    function check(specifier) {
      if (specifier && ts.isStringLiteralLike(specifier)) checkPath(specifier.text);
    }
    visit(source);
    function checkPath(specifier) {
      if (!specifier.startsWith('.')) return;
      const relative = path.relative(root, path.resolve(path.dirname(file), specifier));
      if (relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) errors.push(`${file}: outside import ${specifier}`);
    }
  }
  assert.deepEqual(errors, []);
});
