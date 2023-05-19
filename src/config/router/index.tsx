import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../../pages/Index";
import DetailActivity from "../../pages/Detail/Index";

const Router = () => {
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/detail/:id" element={<DetailActivity/>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default Router;