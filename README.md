# bun-issue-21058

A reproduction repo for https://github.com/oven-sh/bun/issues/21058

## Reproduction step

1. `bun test debug.test.ts` -> Failed
2. `bun test.ts` -> OK
3. `rm -Rf artifacts && bun test debug.test.ts` -> OK
