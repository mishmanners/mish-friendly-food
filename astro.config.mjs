import { defineConfig } from 'astro/config'

export default defineConfig({
	vite: {
		ssr: {
			external: ["svgo"],
		},
	},
})
