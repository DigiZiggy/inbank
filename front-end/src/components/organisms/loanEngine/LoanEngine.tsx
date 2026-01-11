import React, {useState} from "react";
import "./LoanEngine.less";
import {requestLoanDecision} from "../../../services/loan.decision.service";
import {Slider} from "components/atoms/slider/Slider";
import {TextInput} from "components/atoms/textInput/TextInput";
import {Button} from "components/atoms/button/Button";
import {Loader} from "components/atoms/loader/Loader";
import {DECISION_STATUS_LABELS, DecisionStatus, LoanDecisionResponse} from "../../../types/loan.decision.types";

type LoanEngineState = "CALCULATOR" | "LOADING" | "RESULTS";

export const LoanEngine = () => {
    const currency = "€"
    const [loanEngineState, setLoanEngineState] = useState<LoanEngineState>("CALCULATOR");
    const [personalCode, setPersonalCode] = useState("");
    const [loanAmount, setLoanAmount] = useState(4000);
    const [loanPeriodMonths, setLoanPeriodMonths] = useState(24);

    const [error, setError] = useState("");
    const [result, setResult] = useState<LoanDecisionResponse>(null);

    async function onSubmit(event) {
        if (!isFormValid(event)) {
            return;
        }
        setError("");
        setResult(null);
        setLoanEngineState("LOADING");

        try {
            const data: LoanDecisionResponse = await requestLoanDecision({
                personalCode,
                loanAmount: Number(loanAmount),
                loanPeriodMonths: Number(loanPeriodMonths)
            });
            setResult(data);
            setLoanEngineState("RESULTS");
        } catch (err) {
            setError(err.message || "Something went wrong");
            setLoanEngineState("CALCULATOR");
        }
    }

    const isFormValid = (event) => {
        const form = document.querySelector("form.needs-validation")
        const numberInputs = document.querySelectorAll("input[type=number]")
        let isFormValid = true;

        if (!form[0].checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            form.classList.add("was-validated")
            isFormValid = false
        }
        numberInputs.forEach(input => {
            event.preventDefault()
            event.stopPropagation()
            form.classList.add("was-validated")
            const value = input.getAttribute("value");
            const minValue = input.getAttribute("min");
            const maxValue = input.getAttribute("max");
            const isValid = Number(value) >= Number(minValue) && Number(value) <= Number(maxValue);
            input.setAttribute("isvalid", String(isValid));
            if (!isValid) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }

    const renderLoanEngineView = () => {
        switch (loanEngineState) {
            case "LOADING":
                return <Loader/>;

            case "RESULTS":
                return <div className="loan-engine-result">
                    <div className="container py-5 my-3 my-sm-5 bg-light-lavender text-center rounded-5">
                        <div className="result-decision"><b>{DECISION_STATUS_LABELS[result.decision]}</b></div>
                        {result.decision === DecisionStatus.NOT_APPROVED && <div className="result-reason">{result.message}</div>}
                        {!!result.approvedAmount && <div className="mt-5">Largest sum which can be approved: {result.approvedAmount} {currency}</div>}
                        {!!result.approvedPeriodMonths && <div>For a period of: {result.approvedPeriodMonths} months</div>}
                    </div>
                </div>;

            case "CALCULATOR":
            default:
                return <div className="loan-engine bg-light-lavender">
                    <div className="container py-5 my-3">
                        <div className="row align-items-center">
                            <div className="col-12 col-lg-6 ps-5 pe-5 text-center">
                                <h1>Check your loan <i>eligibility</i></h1>
                                <p>Add your personal code, select the loan amount and term to check whether you qualify.</p>
                            </div>
                            <div className="calculator col-12 col-lg-6 ps-5">
                                <section className="mt-5">
                                    <form className="g-3 needs-validation" onSubmit={onSubmit} noValidate>
                                        <TextInput label={"Personal code"}
                                                   errorMessage={"Please enter a valid personal code"}
                                                   required={true}
                                                   pattern={"[0-9]{11}"}
                                                   value={personalCode}
                                                   onChange={setPersonalCode}>
                                        </TextInput>
                                        <Slider label={"Loan amount"}
                                                min={"2000"}
                                                max={"10000"}
                                                step={10}
                                                value={loanAmount}
                                                unit={currency}
                                                onChange={setLoanAmount}>
                                        </Slider>
                                        <Slider label={"Loan period"}
                                                min={"12"}
                                                max={"60"}
                                                step={1}
                                                value={loanPeriodMonths}
                                                unit={"months"}
                                                onChange={setLoanPeriodMonths}>
                                        </Slider>
                                        <Button label="Submit request" className="loan-engine-btn"></Button>
                                    </form>
                                </section>
                            </div>
                        </div>
                        <div>
                            {error && (
                                <div className="result-error text-center my-5">
                                    <div className="error-title">{error}</div>
                                    <p>Make sure all fields are filled and try again!</p>
                                </div>
                            )}
                        </div>
                        <p className="row mt-5 px-5">
                            Test personal codes: 49002010965 (debt), 49002010976, 49002010987, 49002010998
                        </p>
                    </div>
                </div>;
        }
    };

    return (
        <>{renderLoanEngineView()}</>
    );
}
