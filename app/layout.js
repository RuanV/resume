import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Portfolio of Ruan Viljoen - Senior Software Engineer",
	description:
		"Senior Software Engineer and System Architect delivering scalable, high-impact software systems with a business-first mindset and deep full-stack expertise.",
	icons: {
		icon: "/ProfilePicture.png?v=2",
		shortcut: "/ProfilePicture.png?v=2",
		apple: "/ProfilePicture.png?v=2",
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ToastContainer />
				<main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
					<Navbar />
					{children}
					<ScrollToTop />
				</main>
				<Footer />
			</body>
			<GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
		</html>
	);
}
