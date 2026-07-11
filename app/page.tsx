import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Signatures from "@/components/Signatures";
import MenuSection from "@/components/MenuSection";
import InstagramCta from "@/components/InstagramCta";
import ShopInfo from "@/components/ShopInfo";
import Access from "@/components/Access";
import Footer from "@/components/Footer";

/** LP本体。セクションの並びはここで組み立てるだけ */
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Signatures />
        <MenuSection />
        <InstagramCta />
        <ShopInfo />
        <Access />
      </main>
      <Footer />
    </>
  );
}
