import { defineConfig } from 'astro/config'

import react from '@astrojs/react';

export default defineConfig({
	site: 'https://mishfriendfood.github.io',
	integrations: [react()],
	server: {
		port: 3000
	}
})
