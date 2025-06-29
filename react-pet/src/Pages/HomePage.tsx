import Navbar from "../Components/Navbar/Navbar";
import Hero from "../Components/Hero/Hero";
import ServiciiHome from "../Components/Servicii/ServiciiHome";
import Info from "../Components/Info/Info";

function HomePage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <div className="container">
        <ServiciiHome />
      </div>
      <div className="container" style={{ padding: 0 }}>
        <Info />
      </div>
    </div>
  );
}

export default HomePage;
