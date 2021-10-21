export default {
	plugins: ['@snowpack/plugin-dotenv'],
	packageOptions: {
		external: ['@prismicio/client'],
	},
}