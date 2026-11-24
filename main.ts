// The Vacuum's Alibi — u-gentle-badger-68-the-vacuum-s-alibi-one-line-200-2db2cbb7
// Node 22, standard library only. Writes one line, at most 200 characters,
// in which a robot vacuum explains why it missed a spot, to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR). Deterministic: the line is a
// constant, and the program self-checks it against the gate before writing
// — one line, 1-200 characters, not only whitespace. No clock, no
// randomness, no network, so two runs write byte-identical output.
//
// Run outside the grader's container with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LINE =
  'Per my logs, I did not miss that spot: it sits directly under my charging dock, and I do not clean where I sleep.';

function checkGate(text) {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`gate: length ${text.length} not in 1..200`);
  }
  if (text.trim().length === 0) {
    throw new Error('gate: text is only whitespace');
  }
  if (text.includes('\n') || text.includes('\r')) {
    throw new Error('gate: text is more than one line');
  }
}

checkGate(LINE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, 'entry.txt');
writeFileSync(outPath, LINE, 'utf8');
// Read back and verify byte-for-byte: what the grader reads must be the line.
const written = readFileSync(outPath, 'utf8');
if (written !== LINE) {
  throw new Error('gate: written entry does not match the line');
}
checkGate(written);
