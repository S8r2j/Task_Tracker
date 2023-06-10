import Provider from "./Provider";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
    return (
        <>
           <Provider>
                <Navbar /> <div>{ children }</div>
           </Provider>
        </>
    );
};export default Layout;