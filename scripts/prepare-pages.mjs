import { copyFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

// GitHub Pages has no SPA rewrite. Give the only deep route a real static entry.
const output = join('dist', 'unwritten-co', 'browser');
const about = join(output, 'about');
await mkdir(about, { recursive: true });
await copyFile(join(output, 'index.html'), join(about, 'index.html'));
