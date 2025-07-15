import { test } from 'bun:test';

import puppeteer from 'puppeteer';

test('debug', async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await browser.close();
});
