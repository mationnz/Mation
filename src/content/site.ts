export type NavLink = {
	label: string;
	to:
		| "/"
		| "/product"
		| "/solutions"
		| "/architecture"
		| "/security"
		| "/services"
		| "/resources"
		| "/company"
		| "/contact";
};

export const navLinks: NavLink[] = [
	{ label: "Home", to: "/" },
	{ label: "Product", to: "/product" },
	{ label: "Solutions", to: "/solutions" },
	{ label: "Architecture", to: "/architecture" },
	{ label: "Security", to: "/security" },
	{ label: "Services", to: "/services" },
	{ label: "Resources", to: "/resources" },
	{ label: "Company", to: "/company" },
	{ label: "Contact", to: "/contact" },
];

export const mationMeta = {
	name: "Mation",
	tagline:
		"Turn conversations into measurable business outcomes.",
	description:
		"Mation eliminates manual admin and disconnected tools, giving your team a single platform to automate operations, ensure compliance, and drive growth.",
	email: "hello@mation.nz",
	phone: "+64 9 889 4006",
	location: "Auckland, New Zealand",
};
