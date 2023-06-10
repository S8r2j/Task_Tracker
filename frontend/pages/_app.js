import '@/styles/globals.css';
import {Montserrat} from '@next/font/google';
import Provider from '@/components/Provider';
import Router from 'next/router';
import Loader from "../components/Loader";
import { useState } from 'react';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500','700']
})
export default function App({ Component }) {
  const [loading, setLoading] = useState(false);
  Router.events.on("routeChangeStart", (url) => {
    console.log("Router is changing..");
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", (url) => {
    console.log("Route change is completed..");
    setLoading(false);
  });

  return (
    
     <Provider>
      {loading && <Loader />}
         <main className={montserrat.className}>
        <Component  />
        </main>
      
     </Provider>
  );
}
