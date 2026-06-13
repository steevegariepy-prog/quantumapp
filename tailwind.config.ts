import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'], theme: { extend: { colors: { asphalt: '#070b12', neon: '#66f2c2', signal: '#6ea8ff', danger: '#ff5c7a' } } }, plugins: [] };
export default config;
