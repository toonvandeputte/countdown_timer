module.exports = {
  content: ["./timer/**/*.{twig,js,html}"],
  theme: {
	fontSize: {
		'ultra': '20rem',
	},
    extend: {
		animation: {
			'pulse-sec': 'pulse 1s linear infinite',
		  }
	},
  },
  plugins: [],
  
}
