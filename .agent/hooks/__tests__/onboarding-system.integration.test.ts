import { describe, it, expect, beforeAll } from 'bun:test';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

// Import platform-onboarding functions using relative path
// (tests are in .agent/hooks/__tests__, package is in libs/platform-onboarding)
const PLATFORM_ONBOARDING_PATH = '../../../libs/platform-onboarding/src';

const ROOT_DIR = path.resolve(__dirname, '../../..');
const HOOKS_DIR = path.join(ROOT_DIR, '.agent/hooks');
const LOGS_DIR = path.join(ROOT_DIR, '.agent/logs');

/**
 * Helper to load and parse common-issues.yaml with validation.
 * Eliminates repeated boilerplate across tests.
 */
async function loadCommonIssues() {
    const yaml = await import('yaml');
    const { parseCommonIssues } = await import(PLATFORM_ONBOARDING_PATH);
    const yamlPath = path.join(HOOKS_DIR, 'common-issues.yaml');
    const content = fs.readFileSync(yamlPath, 'utf-8');
    return parseCommonIssues(yaml.parse(content));
}

/**
 * Helper to verify a script exists and is executable.
 */
function assertScriptExists(scriptName: string) {
    const scriptPath = path.join(HOOKS_DIR, scriptName);
    expect(fs.existsSync(scriptPath), `${scriptName} should exist`).toBe(true);

    const stats = fs.statSync(scriptPath);
    const isExecutable = Boolean(stats.mode & fs.constants.S_IXUSR);
    expect(isExecutable, `${scriptName} should be executable`).toBe(true);
}

/** Required hook scripts that must exist and be executable */
const REQUIRED_SCRIPTS = [
    'setup-init.sh',
    'setup-maintenance.sh',
    'self-heal.sh',
    'setup-agent.sh',
] as const;

describe('Agentic Onboarding System Integration', () => {
    beforeAll(() => {
        // Ensure we're in the right directory
        expect(fs.existsSync(path.join(ROOT_DIR, 'package.json'))).toBe(true);
    });

    describe('Hook Scripts', () => {
        it.each(REQUIRED_SCRIPTS)('%s exists and is executable', (scriptName) => {
            assertScriptExists(scriptName);
        });
    });

    describe('Common Issues Knowledge Base', () => {
        it('common-issues.yaml exists', () => {
            const yamlPath = path.join(HOOKS_DIR, 'common-issues.yaml');
            expect(fs.existsSync(yamlPath)).toBe(true);
        });

        it('common-issues.yaml has at least 20 issues', () => {
            const yamlPath = path.join(HOOKS_DIR, 'common-issues.yaml');
            const content = fs.readFileSync(yamlPath, 'utf-8');

            // Count issue entries
            const issueMatches = content.match(/- id:/g);
            expect(issueMatches).not.toBeNull();
            expect(issueMatches!.length).toBeGreaterThanOrEqual(20);
        });

        it('common-issues.yaml covers all categories', () => {
            const yamlPath = path.join(HOOKS_DIR, 'common-issues.yaml');
            const content = fs.readFileSync(yamlPath, 'utf-8');

            const requiredCategories = [
                'prerequisites',
                'dependencies',
                'environment',
                'database',
                'build',
                'testing',
                'development',
            ];

            for (const category of requiredCategories) {
                expect(content).toContain(`category: ${category}`);
            }
        });
    });

    describe('Workflows', () => {
        const WORKFLOWS_DIR = path.join(ROOT_DIR, '.agent/workflows');

        it('prime.md workflow exists', () => {
            expect(fs.existsSync(path.join(WORKFLOWS_DIR, 'prime.md'))).toBe(true);
        });

        it('install.md workflow exists', () => {
            expect(fs.existsSync(path.join(WORKFLOWS_DIR, 'install.md'))).toBe(true);
        });

        it('install-interactive.md workflow exists', () => {
            expect(fs.existsSync(path.join(WORKFLOWS_DIR, 'install-interactive.md'))).toBe(true);
        });

        it('maintain.md workflow exists', () => {
            expect(fs.existsSync(path.join(WORKFLOWS_DIR, 'maintain.md'))).toBe(true);
        });

        it('doctor.md workflow exists', () => {
            expect(fs.existsSync(path.join(WORKFLOWS_DIR, 'doctor.md'))).toBe(true);
        });
    });

    describe('Logging Infrastructure', () => {
        it('install logs directory exists', () => {
            expect(fs.existsSync(path.join(LOGS_DIR, 'install'))).toBe(true);
        });

        it('maintenance logs directory exists', () => {
            expect(fs.existsSync(path.join(LOGS_DIR, 'maintenance'))).toBe(true);
        });
    });

    describe('Justfile Commands', () => {
        it('Justfile exists', () => {
            expect(fs.existsSync(path.join(ROOT_DIR, 'Justfile'))).toBe(true);
        });

        it('just --list returns available commands', () => {
            const output = execSync('just --list', {
                cwd: ROOT_DIR,
                encoding: 'utf-8',
            });

            expect(output).toContain('install');
            expect(output).toContain('install-hi');
            expect(output).toContain('doctor');
            expect(output).toContain('maintain');
            expect(output).toContain('heal');
        });
    });

    describe('Structured Log Parsing', () => {
        it('setup-init.sh uses structured markers', () => {
            const scriptPath = path.join(HOOKS_DIR, 'setup-init.sh');
            const content = fs.readFileSync(scriptPath, 'utf-8');

            // Check for structured markers
            expect(content).toContain('✅');
            expect(content).toContain('❌');
            expect(content).toContain('⚠️');
            expect(content).toContain('▶ STEP');
        });

        it('self-heal.sh uses structured markers', () => {
            const scriptPath = path.join(HOOKS_DIR, 'self-heal.sh');
            const content = fs.readFileSync(scriptPath, 'utf-8');

            expect(content).toContain('✅');
            expect(content).toContain('❌');
            expect(content).toContain('⚠️');
        });
    });

    describe('Agent Script Output', () => {
        it('setup-agent.sh produces JSON output', () => {
            const scriptPath = path.join(HOOKS_DIR, 'setup-agent.sh');
            const content = fs.readFileSync(scriptPath, 'utf-8');

            // Check for JSON emission functions
            expect(content).toContain('emit_status');
            expect(content).toContain('emit_final');
            // JSON keys are escaped in bash: \"step\" becomes \"step\"
            expect(content).toContain('\\"step\\"');
            expect(content).toContain('\\"status\\"');
        });
    });

    // ═══════════════════════════════════════════════════════════════════
    // BEHAVIORAL TESTS - Test actual logic, not just file existence
    // ═══════════════════════════════════════════════════════════════════

    describe('Schema Validation', () => {
        it('common-issues.yaml validates against Zod schema', async () => {
            const validated = await loadCommonIssues();

            // Verify structure
            expect(validated.version).toBe('1.0');
            expect(validated.maintainer).toBeDefined();
            expect(Array.isArray(validated.issues)).toBe(true);
            expect(validated.issues.length).toBeGreaterThan(0);
        });

        it('all issues have required fields', async () => {
            const validated = await loadCommonIssues();

            for (const issue of validated.issues) {
                expect(issue.id).toMatch(/^[a-z][a-z0-9-]*$/);
                expect(issue.category).toBeDefined();
                expect(issue.severity).toMatch(/^(blocking|warning|info)$/);
                expect(issue.symptoms.length).toBeGreaterThan(0);
                expect(issue.fix.trim().length).toBeGreaterThan(0);
            }
        });
    });

    describe('Symptom Matching Logic', () => {
        it('matchSymptoms finds exact matches', async () => {
            const { matchSymptoms } = await import(PLATFORM_ONBOARDING_PATH);
            const validated = await loadCommonIssues();

            // Test with known error message
            const errorOutput = 'Error: Node.js 22+ required. Found v18.0.0';
            const matches = matchSymptoms(errorOutput, validated.issues);

            expect(matches.length).toBeGreaterThan(0);
            expect(matches[0].issue.id).toBe('node-version-mismatch');
            expect(matches[0].confidence).toBe('exact');
        });

        it('matchSymptoms returns empty array for unmatched errors', async () => {
            const { matchSymptoms } = await import(PLATFORM_ONBOARDING_PATH);
            const validated = await loadCommonIssues();

            // Test with error that matches no known symptoms
            const errorOutput = 'ZxYwVuTsRqP: completely fabricated error 12345';
            const matches = matchSymptoms(errorOutput, validated.issues);

            // Expect no matches for fabricated error
            expect(matches).toHaveLength(0);
        });
    });

    describe('Command Safety Validation', () => {
        it('validateFixCommand rejects dangerous commands', async () => {
            const { validateFixCommand } = await import(PLATFORM_ONBOARDING_PATH);

            // Dangerous: rm -rf /
            const dangerous1 = validateFixCommand('rm -rf /');
            expect(dangerous1.isValid).toBe(false);

            // Dangerous: rm -rf ~/
            const dangerous2 = validateFixCommand('rm -rf ~/');
            expect(dangerous2.isValid).toBe(false);

            // Dangerous: fork bomb
            const dangerous3 = validateFixCommand(':(){ :|:& };:');
            expect(dangerous3.isValid).toBe(false);
        });

        it('validateFixCommand allows safe bun.sh install', async () => {
            const { validateFixCommand } = await import(PLATFORM_ONBOARDING_PATH);

            // Safe: Official Bun install script
            const safe = validateFixCommand('curl -fsSL https://bun.sh/install | bash');
            expect(safe.isValid).toBe(true);
        });

        it('all fix commands in common-issues.yaml are safe', async () => {
            const { validateFixCommand } = await import(PLATFORM_ONBOARDING_PATH);
            const validated = await loadCommonIssues();

            for (const issue of validated.issues) {
                // Split fix into lines and check each command line
                const lines = issue.fix.split('\n').filter((l: string) => {
                    const trimmed = l.trim();
                    // Skip comments and empty lines
                    return (
                        trimmed.length > 0 &&
                        !trimmed.startsWith('#') &&
                        !trimmed.startsWith('//')
                    );
                });

                for (const line of lines) {
                    const result = validateFixCommand(line);
                    if (!result.isValid) {
                        throw new Error(
                            `Unsafe command in issue "${issue.id}": ${line}\nReason: ${result.reason}`
                        );
                    }
                }
            }
        });
    });

    describe('Bash Script Syntax', () => {
        it('all .sh scripts have valid bash syntax', () => {
            const scripts = [
                'setup-init.sh',
                'setup-agent.sh',
                'setup-maintenance.sh',
                'self-heal.sh',
                '_shared.sh',
            ];

            for (const script of scripts) {
                const scriptPath = path.join(HOOKS_DIR, script);
                if (fs.existsSync(scriptPath)) {
                    // bash -n checks syntax without executing
                    try {
                        execSync(`bash -n "${scriptPath}"`, {
                            encoding: 'utf-8',
                            stdio: 'pipe',
                        });
                    } catch (error) {
                        const message =
                            error instanceof Error ? error.message : String(error);
                        throw new Error(`Syntax error in ${script}: ${message}`, { cause: error });
                    }
                }
            }
        });
    });
});
