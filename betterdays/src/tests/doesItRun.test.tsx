// src/tests/doesItRun.test.tsx

/**
 * Professional CRA start smoke test in TypeScript (.tsx)
 *
 * Features:
 * 1. Compiles successfully without real errors
 * 2. Does not leave the dev server running
 * 3. Frees the port after the test using tree-kill
 * 4. Ignores harmless deprecation warnings
 * 5. Automatically finds a free port if preferred is in use
 * 6. Forces test failure if CRA does not start within 2 minutes
 */

import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import detectPort from 'detect-port';
import treeKill from 'tree-kill';

export {}; // Make this file a module for TypeScript

describe('CRA Development Server Startup', () => {
  jest.setTimeout(150_000); // 2.5 minutes

  it('should start without errors', async () => {
    // -------------------------
    // Stage 1: Determine a free port
    // -------------------------
    const preferredPort = 3000;
    const port = await detectPort(preferredPort);
    console.log(`[Test] Using port: ${port}`);

    // -------------------------
    // Stage 2: Spawn CRA dev server
    // -------------------------
    const startProcess: ChildProcessWithoutNullStreams = spawn(
      'npm',
      ['start'],
      {
        shell: true,
        env: { ...process.env, PORT: port.toString() },
      }
    );

    // -------------------------
    // Stage 3: Wrap in Promise
    // -------------------------
    await new Promise<void>((resolve, reject) => {
      let didCompile = false;
      let hasError = false;
      let resolvedOrRejected = false;

      // Hard 2-minute timeout
      const hardTimeout = setTimeout(() => {
        if (!resolvedOrRejected) {
          resolvedOrRejected = true;
          console.error('[Test] Hard timeout reached: CRA did not start in 2 minutes.');
          cleanup();
          reject(new Error('CRA dev server failed to start within 2 minutes.'));
        }
      }, 120_000);

      // Cleanup function: kills the whole process tree and removes listeners
      const cleanup = () => {
        clearTimeout(hardTimeout);
        if (!startProcess.killed) {
          try {
            treeKill(startProcess.pid); // kills CRA + all children
          } catch (err) {
            console.error('[Test] tree-kill failed:', err);
          }
        }
        startProcess.removeAllListeners();
        startProcess.stdout.removeAllListeners();
        startProcess.stderr.removeAllListeners();
      };

      // Listen for stderr
      startProcess.stderr.on('data', (data: Buffer) => {
        const message = data.toString();
        if (!message.includes('DeprecationWarning')) {
          console.error('[Test][stderr]', message);
          hasError = true;
        }
      });

      // Listen for stdout
      startProcess.stdout.on('data', (data: Buffer) => {
        const output = data.toString();
        if (!resolvedOrRejected) console.log('[Test][stdout]', output);

        if (output.includes('Compiled successfully')) {
          didCompile = true;
          if (!resolvedOrRejected) {
            resolvedOrRejected = true;
            cleanup();
            if (hasError) {
              reject(new Error('CRA dev server emitted errors during startup.'));
            } else {
              resolve();
            }
          }
        }
      });

      // Handle unexpected exit
      startProcess.on('exit', (code: number | null) => {
        if (!resolvedOrRejected) {
          resolvedOrRejected = true;
          cleanup();
          const msg =
            code !== 0
              ? `CRA dev server exited unexpectedly with code ${code}`
              : 'CRA dev server exited before compiling successfully';
          reject(new Error(msg));
        }
      });
    });

    // -------------------------
    // Stage 4: Explicit assertion
    // -------------------------
    expect(true).toBe(true); // placeholder; errors are already caught in the Promise
  });
});

