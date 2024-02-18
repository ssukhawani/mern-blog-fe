import BlogList from "./components/BlogList";
import "./globals.css";

export default function Home({ searchParams: { login, logout } }) {
  return (
    <main className="flex p-4 md:px-8 justify-center lg:px-24">
      <BlogList />
    </main>
  );
}
