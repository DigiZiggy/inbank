import React from "react";
import "./Home.less";
import {LoanEngine} from "components/organisms/loanEngine/LoanEngine";

function Home() {
    return (
        <div className="home-page">
            <LoanEngine />
        </div>
    );
}

export default Home;