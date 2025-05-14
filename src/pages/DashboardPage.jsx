import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Title from "../components/Title";
import Card from "../components/Card"

const DashboardPage = () => {
  return (
    <>
      <Header />
      <div className = "flex">
        <div>
            <NavBar />
        </div>
        <div className="flex-1 p-6">
            <Title color="text-blue-600" title="Dashboard" description="Bienvenidos al sistema de logistica Acme SRL"></Title>
            <Card></Card>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
