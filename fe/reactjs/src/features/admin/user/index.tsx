import { Route, Routes } from "react-router-dom";
import { ListPage } from "./pages/ListPage";

export function UserFeature() {

    return (
        <Routes>
            <Route path="" element={<ListPage />}></Route>
        </Routes>
    )

}