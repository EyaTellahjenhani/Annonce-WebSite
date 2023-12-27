import { Footer } from 'flowbite-react';
import Logo from "../../Logo1.png";

function Footere() {
  return (

    <Footer container >
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.Brand
            href="/"
            src={Logo}
            alt="Logo"
          />
          <Footer.LinkGroup>
            <Footer.Link href="#">About</Footer.Link>
            <Footer.Link href="#">Privacy Policy</Footer.Link>
            <Footer.Link href="#">Licensing</Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="#" by="Azul™" year={2023} />
      </div>
    </Footer>

  );
}

export default Footere;