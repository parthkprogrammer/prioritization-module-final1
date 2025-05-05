
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				title: ['Space Grotesk', 'Montserrat', 'sans-serif'],
				subtitle: ['Nunito', 'sans-serif'],
				heading: ['Lexend', 'Inter', 'Montserrat', 'sans-serif'],
				subheading: ['Poppins', 'Roboto', 'Lato', 'sans-serif'],
				section: ['Bebas Neue', 'sans-serif'],
				body: ['Open Sans', 'Lora', 'sans-serif'],
				quote: ['Playfair Display', 'Cormorant Garamond', 'serif'],
				caption: ['Source Sans Pro', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Adding client colors
				// Dark theme
				dark: {
					base: '#283953', // Charcoal Blue/Deep Slate Blue
					primary: {
						accent1: '#F4A261', // Warm Sand Orange
						accent2: '#2A9D8F', // Teal Green
						support: '#E9C46A', // Golden Beige
					},
					mono: {
						accent1: '#4A5A75', // Slate Blue
						accent2: '#8EA2C6', // Muted Blue
						support: '#D1D5DB', // Cool Gray
					},
					contrast: {
						accent1: '#FFD166', // Golden Yellow
						accent2: '#EF476F', // Crimson Pink
						support: '#06D6A0', // Mint Green
					},
					cool: {
						accent1: '#3B4F71', // Steel Blue
						accent2: '#7289A4', // Muted Blue Gray
						support: '#B0BEC5', // Soft Silver Gray
					},
					warm: {
						accent1: '#D4A373', // Warm Beige
						accent2: '#8D6A9F', // Muted Purple
						support: '#E1C699', // Soft Gold
					},
					energy: {
						accent1: '#F77F00', // Vibrant Orange
						accent2: '#D62828', // Deep Red
						support: '#FCBF49', // Golden Yellow
					},
				},
				// Light theme
				light: {
					base: '#F4EBDC', // Beige/Light Cream
					classic: {
						accent1: '#3A506B', // Deep Steel Blue
						accent2: '#6C757D', // Muted Gray
						support: '#B08968', // Warm Mocha Brown
					},
					modern: {
						accent1: '#8B5E3B', // Walnut Brown
						accent2: '#E29578', // Soft Coral
						support: '#B56576', // Muted Rose
					},
					bold: {
						accent1: '#264653', // Deep Teal
						accent2: '#F77F00', // Warm Orange
						support: '#A4161A', // Rich Red
					},
					neutral: {
						accent1: '#D8C3A5', // Warm Sand
						accent2: '#A9927D', // Muted Taupe
						support: '#C8B6A6', // Dusty Rose Beige
					},
					cozy: {
						accent1: '#9C6644', // Warm Chestnut
						accent2: '#D4A373', // Golden Beige
						support: '#8E7B6D', // Mink Gray
					},
					vibrant: {
						accent1: '#005F73', // Deep Teal
						accent2: '#E63946', // Muted Red
						support: '#F4A261', // Warm Sunset Orange
					},
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
