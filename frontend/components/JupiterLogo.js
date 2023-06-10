import logo from "../public/logo.png";
import Image from 'next/image';

function JupiterLogo() {
  return (
    <div>
          <Image className=' ' src={logo} alt="logo"></Image>
    </div>
  )
}

export default JupiterLogo;
