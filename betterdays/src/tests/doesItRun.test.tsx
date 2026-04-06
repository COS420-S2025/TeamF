// src/tests/doesItRun.test.tsx

/**
 * Professional CRA start smoke test in TypeScript (.tsx)
 *
 * This test ensures that `npm start` for a Create React App project:
 * 1. Compiles successfully without real errors
 * 2. Does not leave the dev server running
 * 3. Frees the port after the test
 * 4. Ignores harmless deprecation warnings
 * 5. Automatically finds a free port if the preferred one is in use
 */

import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import detectPort from 'detect-port';

export {}; // Make this file a module for TypeScript

describe('CRA Development Server Startup', () => {
  // -------------------------------------------------------------
  // Stage 0: Set Jest timeout
  // -------------------------------------------------------------
  // Compilation can take some time; increase timeout to avoid false failures
  jest.setTimeout(60000); // 60 seconds

  it('should start without errors', async () => {
    // -------------------------------------------------------------
    // Stage 1: Determine a free port
    // -------------------------------------------------------------
    const preferredPort = 3000;

    // detectPort returns the preferred port or next available
    const port: number = await detectPort(preferredPort);
    console.log(`[Test] Using port: ${port}`);

    // -------------------------------------------------------------
    // Stage 2: Spawn CRA dev server
    // -------------------------------------------------------------
    const startProcess: ChildProcessWithoutNullStreams = spawn(
      'npm',
      ['start'],
      {
        shell: true,
        env: { ...process.env, PORT: port.toString() },
      }
    );

    // -------------------------------------------------------------
    // Stage 3: Wrap process events in a Promise for async/await
    // -------------------------------------------------------------
    await new Promise<void>((resolve, reject) => {
      // Track test state
      let hasError = false;
      let didCompile = false;

      /**
       * Stage 3a: Cleanup function
       * - Removes listeners to prevent logging after test ends
       * - Kills the server process to free the port
       */
      const cleanup = () => {
        startProcess.removeAllListeners('exit');
        startProcess.stdout.removeAllListeners('data');
        startProcess.stderr.removeAllListeners('data');
        if (!startProcess.killed) startProcess.kill();
      };

      /**
       * Stage 3b: Listen for stderr
       * - Only mark as error if it is a real error
       * - Ignore deprecation warnings (common in Node 24+)
       */
      startProcess.stderr.on('data', (data: Buffer) => {
        const message = data.toString();
        if (!message.includes('DeprecationWarning')) {
          console.error(`[Test][stderr] ${message}`);
          hasError = true;
        }
      });

      /**
       * Stage 3c: Listen for stdout
       * - Detect successful compilation
       */
      startProcess.stdout.on('data', (data: Buffer) => {
        const output = data.toString();
        console.log(`[Test][stdout] ${output}`);

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

      /**
       * Stage 3d: Handle unexpected exit
       */
      startProcess.on('exit', (code: number | null) => {
        if (!didCompile) {
          cleanup();
          const message =
            code !== 0
              ? `CRA dev server exited unexpectedly with code ${code}`
              : 'CRA dev server exited before compiling successfully';
          reject(new Error(message));
        }
      });
    });

    // -------------------------------------------------------------
    // Stage 4: Optional assertion after Promise resolves
    // - Ensures test framework explicitly knows the server compiled successfully
    // -------------------------------------------------------------
    expect(true).toBe(true); // placeholder, as errors are already caught in the Promise
  });
});