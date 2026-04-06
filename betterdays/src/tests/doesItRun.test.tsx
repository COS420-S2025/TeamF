// src/tests/doesItRun.test.tsx

/**
 * Professional CRA start smoke test in TypeScript (.tsx)
 *
 * Features:
 * 1. Compiles successfully without real errors
 * 2. Does not leave the dev server running
 * 3. Frees the port after the test
 * 4. Ignores harmless deprecation warnings
 * 5. Automatically finds a free port if preferred is in use
 * 6. Forces test failure if CRA does not start within 2 minutes
 */

import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import detectPort from 'detect-port';

export {}; // Ensure this file is treated as a module

describe('CRA Development Server Startup', () => {
  jest.setTimeout(150000); // 2.5 minutes just in case

  it('should start without errors', async () => {
    const preferredPort = 3000;
    const port = await detectPort(preferredPort);
    console.log(`[Test] Using port: ${port}`);

    const startProcess: ChildProcessWithoutNullStreams = spawn(
      'npm',
      ['start'],
      {
        shell: true,
        env: { ...process.env, PORT: port.toString() },
      }
    );

    await new Promise<void>((resolve, reject) => {
      let didCompile = false;
      let hasError = false;

      // -------------------------
      // Hard timeout: 2 minutes
      // -------------------------
      const hardTimeout = setTimeout(() => {
        if (!didCompile) {
          console.error('[Test] Hard timeout reached: CRA did not start within 2 minutes.');
          cleanup();
          reject(new Error('CRA dev server failed to start within 2 minutes.'));
        }
      }, 120_000);

      const cleanup = () => {
        clearTimeout(hardTimeout);
        if (!startProcess.killed) startProcess.kill();
        startProcess.removeAllListeners();
        startProcess.stdout.removeAllListeners();
        startProcess.stderr.removeAllListeners();
      };

      // -------------------------
      // Listen to stderr
      // -------------------------
      startProcess.stderr.on('data', (data: Buffer) => {
        const message = data.toString();
        if (!message.includes('DeprecationWarning')) {
          console.error('[Test][stderr]', message);
          hasError = true;
        }
      });

      // -------------------------
      // Listen to stdout
      // -------------------------
      startProcess.stdout.on('data', (data: Buffer) => {
        const output = data.toString();
        console.log('[Test][stdout]', output);

        if (output.includes('Compiled successfully')) {
          didCompile = true;
          cleanup();
          if (hasError) {
            reject(new Error('CRA dev server emitted errors during startup.'));
          } else {
            resolve();
          }
        }
      });

      // -------------------------
      // Handle unexpected exit
      // -------------------------
      startProcess.on('exit', (code: number | null) => {
        if (!didCompile) {
          cleanup();
          const msg =
            code !== 0
              ? `CRA dev server exited unexpectedly with code ${code}`
              : 'CRA dev server exited before compiling successfully';
          reject(new Error(msg));
        }
      });
    });

    // Explicit assertion to satisfy TypeScript/Jest
    expect(true).toBe(true);
  });
});